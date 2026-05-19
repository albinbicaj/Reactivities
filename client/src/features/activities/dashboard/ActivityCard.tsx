import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities';
import { Link } from 'react-router';

type Props = {
    activity: Activity
}

export default function ActivityCard({ activity }: Props) {
    const { deleteActivity } = useActivities();

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {activity.title}
                </Typography>
                <Typography variant="body2" mb={1} color="text.secondary">
                    {activity.date}
                </Typography>

                <Typography variant="body2" mb={1} color="text.secondary">
                    {activity.description}
                </Typography>
                <Typography variant="body2" mb={1} color="text.secondary">
                    {activity.city}
                </Typography>

            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Chip label={activity.category} size="small" color="primary" />
                <Box display="flex" gap={3}>
                    <Button size="small" variant="outlined" component={Link} to={`/activities/${activity.id}`}>View</Button>
                    <Button disabled={deleteActivity.isPending} size="small" variant="outlined" onClick={() => deleteActivity.mutate(activity.id)}>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}
