import { useState } from 'react';
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import { format } from 'date-fns';
import MapComponent from '../../../app/shared/components/MapComponent';

interface Props {
    activity: Activity;
}

export default function ActivityDetailInfo({ activity }: Props) {
    const [showMap, setShowMap] = useState(false);

    const formattedDate = activity.date
        ? format(new Date(activity.date), 'EEEE, d MMMM yyyy, HH:mm')
        : '';

    const hasLocation = activity.latitude !== 0 || activity.longitude !== 0;

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

                {/* Location & Map Toggle */}
                <Grid size={12}>
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between">
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

                        {hasLocation && (
                            <Button
                                size="small"
                                variant={showMap ? 'contained' : 'outlined'}
                                startIcon={<MapIcon />}
                                onClick={() => setShowMap(!showMap)}
                                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                            >
                                {showMap ? 'Hide Map' : 'Show Map'}
                            </Button>
                        )}
                    </Box>

                    {/* Map Display */}
                    {(showMap || hasLocation) && (
                        <Box mt={2.5}>
                            <MapComponent
                                position={[activity.latitude, activity.longitude]}
                                venue={activity.venue}
                                city={activity.city}
                                height={280}
                            />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
}
