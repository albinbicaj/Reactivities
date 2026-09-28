import { TextField, type TextFieldProps } from '@mui/material';
import { useController, type Control, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form';

type Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'control'> & TextFieldProps & {
    control?: Control<TFieldValues, any, any>;
};

export default function AppTextInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
    const { field, fieldState } = useController(props as any);

    return (
        <TextField
            {...props}
            {...field}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}
