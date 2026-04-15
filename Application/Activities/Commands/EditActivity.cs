using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .FindAsync(request.Activity.Id)
                ?? throw new Exception("Activity not found");

            activity.Title = request.Activity.Title ?? activity.Title;
            activity.Description = request.Activity.Description ?? activity.Description;
            activity.Date = request.Activity.Date;
            activity.Category = request.Activity.Category ?? activity.Category;
            activity.City = request.Activity.City ?? activity.City;
            activity.Venue = request.Activity.Venue ?? activity.Venue;
            activity.IsCancelled = request.Activity.IsCancelled;
            activity.Latitude = request.Activity.Latitude;
            activity.Longitude = request.Activity.Longitude;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
