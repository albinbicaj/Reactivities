import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import { Link, useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema, type ActivitySchema } from '../../../lib/schemas/activitySchema';
import AppTextInput from '../../../app/shared/components/AppTextInput';
import AppSelectInput from '../../../app/shared/components/AppSelectInput';
import AppDateInput from '../../../app/shared/components/AppDateInput';
import AppLocationInput, { type LocationData } from '../../../app/shared/components/AppLocationInput';
import { categoryOptions } from '../../../app/shared/components/categoryOptions';
import MapComponent from '../../../app/shared/components/MapComponent';

export default function ActivityForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateActivity, createActivity, activity: fetchedActivity, isPendingActivity } = useActivities(id);

    const { control, handleSubmit, reset, setValue, watch } = useForm<ActivitySchema>({
        resolver: zodResolver(activitySchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            date: new Date(),
            city: '',
            venue: '',
            latitude: 0,
            longitude: 0,
        },
    });

    const latitude = watch('latitude') ?? 0;
    const longitude = watch('longitude') ?? 0;
    const venue = watch('venue');
    const city = watch('city');

    useEffect(() => {
        if (id && fetchedActivity) {
            reset({
                ...fetchedActivity,
                date: fetchedActivity.date ? new Date(fetchedActivity.date) : new Date(),
                latitude: fetchedActivity.latitude ?? 0,
                longitude: fetchedActivity.longitude ?? 0,
            });
        }
    }, [id, fetchedActivity, reset]);

    if (id && isPendingActivity) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    const handleLocationSelect = (loc: LocationData) => {
        setValue('city', loc.city, { shouldValidate: true });
        setValue('venue', loc.venue, { shouldValidate: true });
        setValue('latitude', loc.latitude);
        setValue('longitude', loc.longitude);
    };

    const onSubmit = async (data: ActivitySchema) => {
        const formattedData = {
            ...data,
            date: data.date.toISOString(),
        };

        if (id && fetchedActivity) {
            const updatedActivity = {
                ...fetchedActivity,
                ...formattedData,
            };
            await updateActivity.mutateAsync(updatedActivity);
            navigate(`/activities/${id}`);
        } else {
            const newId = crypto.randomUUID();
            const newActivity = {
                ...formattedData,
                id: newId,
                isCancelled: false,
            };
            await createActivity.mutateAsync(newActivity as Activity);
            navigate(`/activities/${newId}`);
        }
    };

    const isSubmitting = updateActivity.isPending || createActivity.isPending;

    return (
        <Paper sx={{ borderRadius: 3, p: 4, maxWidth: 800, mx: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight={700}>
                {id ? 'Edit Activity' : 'Create Activity'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3} mt={2}>
                <AppTextInput name="title" control={control} label="Title" />
                <AppTextInput name="description" control={control} label="Description" multiline rows={3} />
                <AppSelectInput name="category" control={control} label="Category" options={categoryOptions} />
                <AppDateInput name="date" control={control} label="Date & Time" />

                <AppLocationInput
                    name="venue"
                    control={control}
                    label="Search Location / Venue"
                    onSelectLocation={handleLocationSelect}
                />

                <AppTextInput name="city" control={control} label="City" />

                {/* Live Map Preview when latitude & longitude are selected */}
                {latitude !== 0 && longitude !== 0 && (
                    <Box mt={1}>
                        <Typography variant="subtitle2" color="text.secondary" mb={1} fontWeight={600}>
                            Selected Location Preview
                        </Typography>
                        <MapComponent position={[latitude, longitude]} venue={venue} city={city} height={250} />
                    </Box>
                )}

                <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
                    <Button
                        component={Link}
                        to={id ? `/activities/${id}` : '/activities'}
                        variant="outlined"
                        color="inherit"
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        sx={{ borderRadius: 2, px: 4, fontWeight: 600 }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
