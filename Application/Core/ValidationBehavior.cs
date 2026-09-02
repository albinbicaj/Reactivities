using FluentValidation;
using MediatR;

namespace Application.Core;

/// <summary>
/// MediatR pipeline behaviour that runs FluentValidation validators (#94)
/// before any handler is invoked.
/// If validation fails, a failed Result is returned immediately so the
/// handler is never reached.
/// </summary>
public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        // If no validator is registered for this request, skip validation.
        if (validator is null) return await next(cancellationToken);

        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            // Build a single error string that lists every failure.
            var errors = validationResult.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage).ToArray()
                );

            // Throw a ValidationException so the ExceptionMiddleware can catch it
            // and return a 400 with the full errors dict.
            throw new ValidationException(validationResult.Errors);
        }

        return await next(cancellationToken);
    }
}
