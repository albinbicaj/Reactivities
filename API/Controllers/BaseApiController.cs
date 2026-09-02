using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Core;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("Mediator not found");

    /// <summary>
    /// Converts a Result&lt;T&gt; to the appropriate IActionResult.
    /// Returns 200/204 on success or 404 NotFound on failure.
    /// </summary>
    protected ActionResult HandleResult<T>(Result<T>? result)
    {
        if (result == null) return NotFound();
        if (result.IsSuccess && result.Value != null) return Ok(result.Value);
        if (result.IsSuccess && result.Value == null) return NoContent();
        return NotFound(result.Error);
    }
}