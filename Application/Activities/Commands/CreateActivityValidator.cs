using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Commands;

/// <summary>
/// FluentValidation validator for the CreateActivity Command.
/// Registered automatically by the DI scan in Program.cs.
/// </summary>
public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto).SetValidator(new ActivityDtoValidator());
    }
}

public class ActivityDtoValidator : AbstractValidator<CreateActivityDto>
{
    public ActivityDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => x.Category).NotEmpty().WithMessage("Category is required");
        RuleFor(x => x.City).NotEmpty().WithMessage("City is required");
        RuleFor(x => x.Venue).NotEmpty().WithMessage("Venue is required");
        RuleFor(x => x.Date)
            .NotEqual(default(DateTime))
            .WithMessage("Date is required");
    }
}
