namespace API.Middleware;

/// <summary>
/// Represents a structured API error response body, including an optional
/// stack trace that is only populated in Development mode.
/// </summary>
public class AppException(int statusCode, string message, string? details = null)
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
