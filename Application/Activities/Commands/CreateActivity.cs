using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<string>
        {
            public required Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                await _context.Activities.AddAsync(request.Activity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return request.Activity.Id;
            }
        }
    }
}
