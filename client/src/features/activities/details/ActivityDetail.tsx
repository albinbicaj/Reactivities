import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities';
import { Link, useParams } from 'react-router';

export default function ActivityDetail() {
    const { id } = useParams();
    const { activity, isPendingActivity } = useActivities(id);

    if (isPendingActivity) return <Typography>Loading...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component="img"
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {activity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {activity.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {activity.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/manage/${activity.id}`} variant="contained" color="primary">
                    Edit
                </Button>
                <Button component={Link} to='/activities' variant="contained" color="primary">
                    Cancel
                </Button>
            </CardActions>
        </Card >
    )
}
