import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities'

type Props = {
    activity?: Activity,
    closeForm: () => void
}

export default function ActivityForm({ activity, closeForm }: Props) {

    const { updateActivity, createActivity } = useActivities()

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
            closeForm()
        }
        else {
            const newActivity = {
                ...data,
                id: crypto.randomUUID(),
                isCancelled: false,
                latitude: 0,
                longitude: 0,
            }
            await createActivity.mutateAsync(newActivity as unknown as Activity)
            closeForm()
        }
    }

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant='h5' gutterBottom color='primary'>
                Create a new activity
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

                    <Button variant='contained' color='inherit' onClick={closeForm}>
                        Cancel
                    </Button>
                    <Button variant='contained' color='success' type='submit' loading={updateActivity.isPending}
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
