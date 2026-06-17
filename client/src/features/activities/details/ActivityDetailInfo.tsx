import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { format } from 'date-fns';

interface Props {
    activity: Activity;
}

export default function ActivityDetailInfo({ activity }: Props) {
    const formattedDate = activity.date
        ? format(new Date(activity.date), 'EEEE, d MMMM yyyy, HH:mm')
        : '';

    return (
        <Card sx={{ borderRadius: 3, p: 3, mb: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Grid container spacing={3}>
                {/* Description */}
                <Grid size={12}>
                    <Box display="flex" alignItems="flex-start" gap={2}>
                        <InfoIcon sx={{ color: 'primary.main', mt: 0.3 }} />
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Description
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 0.5, color: 'text.primary', lineHeight: 1.6 }}>
                                {activity.description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={12}>
                    <Divider sx={{ opacity: 0.6 }} />
                </Grid>

                {/* Date */}
                <Grid size={12}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <CalendarTodayIcon sx={{ color: 'primary.main' }} />
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Date & Time
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 0.5, color: 'text.primary' }}>
                                {formattedDate}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={12}>
                    <Divider sx={{ opacity: 0.6 }} />
                </Grid>

                {/* Location */}
                <Grid size={12}>
                    <Box display="flex" alignItems="flex-start" gap={2}>
                        <LocationOnIcon sx={{ color: 'primary.main', mt: 0.3 }} />
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Venue & City
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 0.5, color: 'text.primary' }}>
                                {activity.venue ? `${activity.venue}, ` : ''}{activity.city}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}
