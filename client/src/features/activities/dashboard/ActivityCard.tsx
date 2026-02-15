import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'

type Props = {
    activity: Activity,
    selectActivity: (id: string) => void,
    deleteActivity: (id: string) => void
}

export default function ActivityCard({ activity, selectActivity, deleteActivity }: Props) {
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
                    <Button size="small" variant="outlined" onClick={() => selectActivity(activity.id)}>View</Button>
                    <Button size="small" variant="outlined" onClick={() => deleteActivity(activity.id)}>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}
