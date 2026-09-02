using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<List<Activity>>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Activity>>>
    {
        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await context.Activities.ToListAsync(cancellationToken);
            return Result<List<Activity>>.Success(activities);
        }
    }
}