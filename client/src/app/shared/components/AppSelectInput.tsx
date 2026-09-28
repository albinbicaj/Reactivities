import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useController, type Control, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form';

type Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'control'> & {
    label: string;
    options: { text: string; value: string }[];
    disabled?: boolean;
    control?: Control<TFieldValues, any, any>;
};

export default function AppSelectInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const { field, fieldState } = useController(props as any);

    return (
        <FormControl fullWidth error={!!fieldState.error} disabled={props.disabled}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                {...field}
                label={props.label}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.text}
                    </MenuItem>
                ))}
            </Select>
            {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
        </FormControl>
    );
}
