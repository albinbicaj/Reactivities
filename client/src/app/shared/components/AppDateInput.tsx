import { TextField, type TextFieldProps } from '@mui/material';
import { useController, type Control, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form';

type Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'control'> & TextFieldProps & {
    label: string;
    control?: Control<TFieldValues, any, any>;
};

export default function AppDateInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const { field, fieldState } = useController(props as any);

    const getFormattedValue = (val: any) => {
        if (!val) return '';
        const dateObj = val instanceof Date ? val : new Date(val);
        if (isNaN(dateObj.getTime())) return '';
        const pad = (n: number) => n.toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        const month = pad(dateObj.getMonth() + 1);
        const day = pad(dateObj.getDate());
        const hours = pad(dateObj.getHours());
        const minutes = pad(dateObj.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <TextField
            {...props}
            fullWidth
            type="datetime-local"
            label={props.label}
            InputLabelProps={{ shrink: true }}
            value={getFormattedValue(field.value)}
            onChange={(e) => {
                const val = e.target.value;
                field.onChange(val ? new Date(val) : null);
            }}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}
