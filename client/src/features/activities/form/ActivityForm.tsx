import { Box, Button, Paper, TextField, Typography } from '@mui/material'

type Props = {
    activity?: Activity,
    closeForm: () => void
    submitForm: (activity: Activity) => void
}

export default function ActivityForm({ activity, closeForm, submitForm }: Props) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value
        })
        if (activity) data.id = activity.id
        submitForm(data as unknown as Activity)
    }

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant='h5' gutterBottom color='primary'>
                Create a new activity
            </Typography>
            <Box component='form' display='flex' flexDirection='column' gap={3}>

                <TextField label='Title' variant='outlined' value={activity?.title || ''} />
                <TextField label='Description' variant='outlined' multiline rows={4} />
                <TextField label='Category' variant='outlined' />
                <TextField label='Date' variant='outlined' type='datetime-local' InputLabelProps={{ shrink: true }} />
                <TextField label='City' variant='outlined' />
                <TextField label='Venue' variant='outlined' />
                <Box display='flex' justifyContent='flex-end' gap={2}>

                    <Button variant='contained' color='inherit' onClick={closeForm}>
                        Cancel
                    </Button>
                    <Button variant='contained' color='success' type='submit' onClick={handleSubmit}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
