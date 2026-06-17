import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Typography,
    Divider,
    Avatar,
} from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CategoryIcon from '@mui/icons-material/Category'
import { useActivities } from '../../../lib/hooks/useActivities'
import { Link } from 'react-router'
import { format } from 'date-fns'

type Props = {
    activity: Activity
}

const categoryColors: Record<string, string> = {
    drinks: '#f97316',
    culture: '#8b5cf6',
    film: '#ec4899',
    food: '#10b981',
    music: '#3b82f6',
    travel: '#06b6d4',
    sport: '#ef4444',
}

const categoryGradients: Record<string, string> = {
    drinks: 'linear-gradient(135deg, #f97316, #fb923c)',
    culture: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    film: 'linear-gradient(135deg, #ec4899, #f472b6)',
    food: 'linear-gradient(135deg, #10b981, #34d399)',
    music: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    travel: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    sport: 'linear-gradient(135deg, #ef4444, #f87171)',
}

const defaultColor = '#6366f1'
const defaultGradient = 'linear-gradient(135deg, #6366f1, #818cf8)'

export default function ActivityCard({ activity }: Props) {
    const { deleteActivity } = useActivities()

    const accentColor = categoryColors[activity.category?.toLowerCase()] ?? defaultColor
    const accentGradient = categoryGradients[activity.category?.toLowerCase()] ?? defaultGradient

    const formattedDate = activity.date
        ? format(new Date(activity.date), 'EEE, d MMM yyyy')
        : activity.date

    return (
        <Card
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.14)',
                },
            }}
        >
            {/* Accent top bar */}
            <Box sx={{ height: 5, background: accentGradient }} />

            <CardContent sx={{ p: 2.5, pb: '12px !important' }}>
                {/* Header row */}
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1.5}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                            sx={{
                                width: 42,
                                height: 42,
                                background: accentGradient,
                                fontSize: 18,
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {activity.title?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    lineHeight: 1.25,
                                    color: 'text.primary',
                                }}
                            >
                                {activity.title}
                            </Typography>
                            <Chip
                                icon={<CategoryIcon sx={{ fontSize: '13px !important' }} />}
                                label={activity.category}
                                size="small"
                                sx={{
                                    mt: 0.4,
                                    height: 20,
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    background: `${accentColor}18`,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}40`,
                                    '& .MuiChip-icon': { color: accentColor },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {activity.description}
                </Typography>

                {/* Meta info */}
                <Box display="flex" flexDirection="column" gap={0.6} mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            {formattedDate}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            {activity.city}{activity.venue ? ` · ${activity.venue}` : ''}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 1.5, opacity: 0.6 }} />

                {/* Actions */}
                <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Button
                        size="small"
                        variant="outlined"
                        disabled={deleteActivity.isPending}
                        onClick={() => deleteActivity.mutate(activity.id)}
                        sx={{
                            borderRadius: 2,
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            fontWeight: 600,
                            borderColor: 'rgba(0,0,0,0.15)',
                            color: 'text.secondary',
                            '&:hover': {
                                borderColor: '#ef4444',
                                color: '#ef4444',
                                bgcolor: '#ef444410',
                            },
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        component={Link}
                        to={`/activities/${activity.id}`}
                        disableElevation
                        sx={{
                            borderRadius: 2,
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            fontWeight: 600,
                            background: accentGradient,
                            '&:hover': {
                                opacity: 0.88,
                                background: accentGradient,
                            },
                        }}
                    >
                        View Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}
