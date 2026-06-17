import {
    Box,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Divider,
    Chip,
    Button,
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

export type HostFilter = 'all' | 'hosted' | 'not-hosted'

export type ActivityFiltersState = {
    hostFilter: HostFilter
    dateFrom: string
    dateTo: string
}

type Props = {
    filters: ActivityFiltersState
    onChange: (filters: ActivityFiltersState) => void
}

export const defaultFilters: ActivityFiltersState = {
    hostFilter: 'all',
    dateFrom: '',
    dateTo: '',
}

export default function ActivityFilters({ filters, onChange }: Props) {
    const hasActiveFilters =
        filters.hostFilter !== 'all' || filters.dateFrom !== '' || filters.dateTo !== ''

    const handleReset = () => onChange(defaultFilters)

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                overflow: 'hidden',
                position: 'sticky',
                top: 24,
            }}
        >
            {/* Header bar */}
            <Box
                sx={{
                    height: 5,
                    background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                }}
            />

            <CardContent sx={{ p: 2.5, pb: '16px !important' }}>
                {/* Title row */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <FilterListIcon sx={{ fontSize: 18, color: '#6366f1' }} />
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.9rem' }}
                        >
                            Filters
                        </Typography>
                        {hasActiveFilters && (
                            <Chip
                                label="Active"
                                size="small"
                                sx={{
                                    height: 18,
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    background: '#6366f115',
                                    color: '#6366f1',
                                    border: '1px solid #6366f140',
                                }}
                            />
                        )}
                    </Box>
                    {hasActiveFilters && (
                        <Button
                            size="small"
                            startIcon={<RestartAltIcon sx={{ fontSize: 14 }} />}
                            onClick={handleReset}
                            sx={{
                                fontSize: '0.7rem',
                                textTransform: 'none',
                                fontWeight: 600,
                                color: 'text.secondary',
                                minWidth: 0,
                                px: 1,
                                py: 0.25,
                                borderRadius: 1.5,
                                '&:hover': { color: '#ef4444', bgcolor: '#ef444410' },
                            }}
                        >
                            Reset
                        </Button>
                    )}
                </Box>

                <Divider sx={{ mb: 2, opacity: 0.5 }} />

                {/* Host filter */}
                <FormControl fullWidth size="small" sx={{ mb: 2.5 }}>
                    <InputLabel
                        sx={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'text.secondary',
                        }}
                    >
                        Activity Type
                    </InputLabel>
                    <Select
                        value={filters.hostFilter}
                        label="Activity Type"
                        onChange={(e) =>
                            onChange({ ...filters, hostFilter: e.target.value as HostFilter })
                        }
                        sx={{
                            borderRadius: 2,
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0,0,0,0.12)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#6366f1',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#6366f1',
                            },
                        }}
                    >
                        <MenuItem value="all" sx={{ fontSize: '0.85rem' }}>
                            🌐 All Activities
                        </MenuItem>
                        <MenuItem value="hosted" sx={{ fontSize: '0.85rem' }}>
                            ⭐ Hosted
                        </MenuItem>
                        <MenuItem value="not-hosted" sx={{ fontSize: '0.85rem' }}>
                            👤 Not Hosted
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Date range */}
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 600,
                        color: 'text.secondary',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontSize: '0.7rem',
                        display: 'block',
                        mb: 1,
                    }}
                >
                    Date Range
                </Typography>

                <Box display="flex" flexDirection="column" gap={1.5}>
                    <TextField
                        label="From"
                        type="date"
                        size="small"
                        fullWidth
                        value={filters.dateFrom}
                        onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            max: filters.dateTo || undefined,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                fontSize: '0.85rem',
                                '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
                        }}
                    />
                    <TextField
                        label="To"
                        type="date"
                        size="small"
                        fullWidth
                        value={filters.dateTo}
                        onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            min: filters.dateFrom || undefined,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                fontSize: '0.85rem',
                                '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}
