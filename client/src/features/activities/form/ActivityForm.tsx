import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities'
import { Link, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'

export default function ActivityForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { updateActivity, createActivity, activity: fetchedActivity, isPendingActivity } = useActivities(id)
    const [activity, setActivity] = useState<Activity | undefined>(undefined)

    useEffect(() => {
        if (id && fetchedActivity) setActivity(fetchedActivity)
    }, [id, fetchedActivity])

    if (id && isPendingActivity) return <Typography>Loading...</Typography>

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value
        })
        if (activity) {
            const updatedActivity = { ...activity, ...data }
            await updateActivity.mutateAsync(updatedActivity as unknown as Activity)
            navigate(`/activities/${activity.id}`)
        }
        else {
            const newId = crypto.randomUUID()
            const newActivity = {
                ...data,
                id: newId,
                isCancelled: false,
                latitude: 0,
                longitude: 0,
            }
            await createActivity.mutateAsync(newActivity as unknown as Activity)
            navigate('/activities')
        }
    }

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant='h5' gutterBottom color='primary'>
                {activity ? 'Edit activity' : 'Create a new activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>

                <TextField name='title' label='Title' variant='outlined' defaultValue={activity?.title || ''} />
                <TextField name='description' label='Description' variant='outlined' multiline rows={4} defaultValue={activity?.description || ''} />
                <TextField name='category' label='Category' variant='outlined' defaultValue={activity?.category || ''} />
                <TextField name='date' label='Date' variant='outlined'
                    type='date' InputLabelProps={{ shrink: true }}
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] :
                        new Date().toISOString().split('T')[0]
                    }
                />
                <TextField name='city' label='City' variant='outlined' defaultValue={activity?.city || ''} />
                <TextField name='venue' label='Venue' variant='outlined' defaultValue={activity?.venue || ''} />
                <Box display='flex' justifyContent='flex-end' gap={2}>

                    <Button component={Link} to={activity ? `/activities/${activity.id}` : '/activities'} variant='contained' color='inherit'>
                        Cancel
                    </Button>
                    <Button variant='contained' color='success' type='submit'
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
