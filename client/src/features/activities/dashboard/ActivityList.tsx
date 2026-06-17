import { Box, Typography } from '@mui/material'
import ActivityCard from './ActivityCard'
import { useActivities } from '../../../lib/hooks/useActivities'
import { ActivityFiltersState } from './ActivityFilters'

type Props = {
    filters: ActivityFiltersState
}

export default function ActivityList({ filters }: Props) {
    const { activities, isPending } = useActivities()

    if (isPending) return <div>Loading activities...</div>

    if (!activities) return <div>No activities found</div>

    const filtered = activities.filter((activity) => {
        // Host filter — based on isHost field; adjust field name if yours differs
        if (filters.hostFilter === 'hosted' && !activity.isHost) return false
        if (filters.hostFilter === 'not-hosted' && activity.isHost) return false

        // Date from
        if (filters.dateFrom) {
            const activityDate = new Date(activity.date)
            const from = new Date(filters.dateFrom)
            if (activityDate < from) return false
        }

        // Date to
        if (filters.dateTo) {
            const activityDate = new Date(activity.date)
            const to = new Date(filters.dateTo)
            // include the full "to" day
            to.setHours(23, 59, 59, 999)
            if (activityDate > to) return false
        }

        return true
    })

    if (filtered.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    py: 8,
                    color: 'text.secondary',
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={0.5}>
                    No activities found
                </Typography>
                <Typography variant="body2">
                    Try adjusting your filters.
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {filtered.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
            ))}
        </Box>
    )
}
