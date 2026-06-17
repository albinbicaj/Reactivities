import { Grid } from '@mui/material'
import { useState } from 'react'
import ActivityList from './ActivityList'
import ActivityFilters, { defaultFilters, ActivityFiltersState } from './ActivityFilters'

export default function ActivityDashboard() {
    const [filters, setFilters] = useState<ActivityFiltersState>(defaultFilters)

    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList filters={filters} />
            </Grid>
            <Grid size={5}>
                <ActivityFilters filters={filters} onChange={setFilters} />
            </Grid>
        </Grid>
    )
}
