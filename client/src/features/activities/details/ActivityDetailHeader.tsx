import { Box, Button, Card, CardActions, CardMedia, Typography, styled } from '@mui/material';
import { Link } from 'react-router';
import { format } from 'date-fns';

const categoryGradients: Record<string, string> = {
    drinks: 'linear-gradient(135deg, #f97316, #fb923c)',
    culture: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    film: 'linear-gradient(135deg, #ec4899, #f472b6)',
    food: 'linear-gradient(135deg, #10b981, #34d399)',
    music: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    travel: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    sport: 'linear-gradient(135deg, #ef4444, #f87171)',
};

const defaultGradient = 'linear-gradient(135deg, #6366f1, #818cf8)';

const ImageOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
});

const ContentWrapper = styled(Box)({
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    color: 'white',
    textShadow: '0px 2px 4px rgba(0,0,0,0.6)',
});

interface Props {
    activity: Activity;
    isGoing: boolean;
    onJoinLeave: () => void;
    isHost: boolean;
    hostName: string;
}

export default function ActivityDetailHeader({ activity, isGoing, onJoinLeave, isHost, hostName }: Props) {
    const categoryLower = activity.category?.toLowerCase() || 'travel';
    const accentGradient = categoryGradients[categoryLower] ?? defaultGradient;

    const formattedDate = activity.date
        ? format(new Date(activity.date), 'EEEE, d MMMM yyyy')
        : '';

    return (
        <Card sx={{ borderRadius: 3, overflow: 'hidden', mb: 3, position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Box sx={{ position: 'relative', height: 260 }}>
                <CardMedia
                    component="img"
                    image={`/images/categoryImages/${categoryLower}.jpg`}
                    alt={activity.category}
                    sx={{ height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                        // Fallback image if local image not found
                        (e.target as HTMLImageElement).src = `https://picsum.photos/800/300?sig=${categoryLower}`;
                    }}
                />
                <ImageOverlay />
                <ContentWrapper>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
                        {activity.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.9 }}>
                        {formattedDate}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
                        Hosted by <strong>{hostName}</strong>
                    </Typography>
                </ContentWrapper>
            </Box>
            <CardActions sx={{ justifyContent: 'space-between', p: 2, bgcolor: 'background.paper' }}>
                <Box display="flex" gap={1}>
                    {isHost ? (
                        <Button
                            component={Link}
                            to={`/manage/${activity.id}`}
                            variant="contained"
                            color="info"
                            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                        >
                            Manage Activity
                        </Button>
                    ) : isGoing ? (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={onJoinLeave}
                            sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                        >
                            Cancel Attendance
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={onJoinLeave}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 2,
                                background: accentGradient,
                                '&:hover': { opacity: 0.9 }
                            }}
                        >
                            Join Activity
                        </Button>
                    )}
                </Box>
                <Button
                    component={Link}
                    to="/activities"
                    variant="outlined"
                    sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, color: 'text.secondary', borderColor: 'divider' }}
                >
                    Back to Activities
                </Button>
            </CardActions>
        </Card>
    );
}
