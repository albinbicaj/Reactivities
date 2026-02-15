import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'


type Props = {
    activity: Activity,
    cancelSelectActivity: () => void,
    openForm: (id?: string) => void
}

export default function ActivityDetail({ activity, cancelSelectActivity, openForm }: Props) {
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
                <Button variant="contained" color="primary" onClick={() => openForm(activity.id)}>
                    Edit
                </Button>
                <Button variant="contained" color="primary" onClick={cancelSelectActivity}>
                    Cancel
                </Button>
            </CardActions>
        </Card >
    )
}
