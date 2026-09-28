import { useState, useEffect } from 'react';
import { Autocomplete, Box, CircularProgress, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useController, type Control, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form';
import axios from 'axios';

export interface LocationData {
    city: string;
    venue: string;
    latitude: number;
    longitude: number;
}

type LocationOption = {
    displayName: string;
    venue: string;
    city: string;
    lat: number;
    lon: number;
};

type Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'control'> & {
    label: string;
    onSelectLocation: (data: LocationData) => void;
    control?: Control<TFieldValues, any, any>;
};

export default function AppLocationInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const { field, fieldState } = useController(props as any);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<LocationOption[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (field.value && field.value !== inputValue) {
            setInputValue(field.value);
        }
    }, [field.value]);

    useEffect(() => {
        if (!inputValue || inputValue.length < 3) {
            setOptions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: inputValue,
                        format: 'json',
                        addressdetails: 1,
                        limit: 5,
                    },
                });

                const fetchedOptions: LocationOption[] = response.data.map((item: any) => {
                    const addr = item.address || {};
                    const city = addr.city || addr.town || addr.village || addr.county || addr.state || item.display_name.split(',')[0];
                    const venue = addr.amenity || addr.building || addr.road || addr.suburb || item.display_name.split(',')[0];
                    return {
                        displayName: item.display_name,
                        venue: venue,
                        city: city,
                        lat: parseFloat(item.lat),
                        lon: parseFloat(item.lon),
                    };
                });

                setOptions(fetchedOptions);
            } catch (err) {
                console.error('Failed to fetch location autocomplete options', err);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue]);

    return (
        <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.displayName}
            filterOptions={(x) => x}
            inputValue={inputValue}
            onInputChange={(_, newValue) => {
                setInputValue(newValue);
                field.onChange(newValue);
            }}
            onChange={(_, newValue) => {
                if (newValue && typeof newValue !== 'string') {
                    field.onChange(newValue.venue);
                    props.onSelectLocation({
                        city: newValue.city,
                        venue: newValue.venue,
                        latitude: newValue.lat,
                        longitude: newValue.lon,
                    });
                }
            }}
            renderOption={(propsOption, option) => {
                const { key, ...optionProps } = propsOption as any;
                return (
                    <Box component="li" key={key} {...optionProps} display="flex" alignItems="center" gap={1.5}>
                        <LocationOnIcon color="action" />
                        <Box>
                            <Typography variant="body2" fontWeight={600}>
                                {option.venue}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {option.displayName}
                            </Typography>
                        </Box>
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...props}
                    label={props.label}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}
