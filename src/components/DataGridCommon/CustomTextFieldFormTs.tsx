import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import { ReactNode, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues
} from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

interface ICustomTextFieldFormProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control?: Control<any>;
  errors?: FieldErrors<TFieldValues>;
  rules?: any;
  name: FieldPath<TFieldValues>;
  defaultValue?: string;
  requiredField?: boolean;
  disabled?: boolean;
  rows?: number;
  multiline?: boolean;
  onChange?: (value: string) => void;
  onKeyPress?: () => void;
  style?: {};
  width?: number;
  labelFullField?: string;
  label?: string;
  inputProps?: {};
  endAdornment?: ReactNode;
}

const CustomTextFieldFormTs = ({
  control,
  errors = {},
  rules = {},
  defaultValue = '',
  requiredField = false,
  name = '',
  label = '',
  labelFullField = '',
  width = null,
  style = {},
  disabled = false,
  inputProps = {},
  onChange = () => { },
  onKeyPress = () => { },
  endAdornment = null,
  multiline = false,
  rows = 0
}: ICustomTextFieldFormProps) => {
  const theme = useTheme();
  const [fieldValue, setFieldValue] = useState(defaultValue);
  const [isFocus, setIsFocus] = useState(false);

  // Manejo mejorado de errores
  const error = errors[name];
  const helperText = error?.message as string;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <ThemeProvider theme={theme}>
          <TextField
            {...field}
            variant="outlined"
            label={
              <>
                {!!field.value || isFocus ? labelFullField : label}
                {requiredField && (
                  <span style={{ color: theme.palette.error.main }}>
                    *
                  </span>
                )}
              </>
            }
            fullWidth={!width}
            style={{
              ...style,
              width: width,
              minHeight: '56px'
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: error ? 'error.main' : undefined,
                },
                '&:hover fieldset': {
                  borderColor: error ? 'error.main' : undefined,
                },
                '&.Mui-focused fieldset': {
                  borderColor: error ? 'error.main' : undefined,
                },
                height: multiline ? 'auto' : '56px',
              },
            }}
            helperText={helperText || ' '} // Espacio reservado para mantener el layout
            error={!!error}
            disabled={disabled}
            onChange={(event) => {
              const value = event.target.value.trim() === '' ? null : event.target.value;
              field.onChange(value);
              setFieldValue(value);
              onChange(value);
            }}
            onKeyPress={onKeyPress}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              field.onBlur();
            }}
            value={field.value || ''}
            InputProps={{
              ...inputProps,
              endAdornment: endAdornment,
            }}
            multiline={multiline}
            rows={multiline ? rows : 0}
            FormHelperTextProps={{
              sx: {
                color: error ? 'error.main' : undefined,
                marginLeft: 0,
                height: '20px', // Espacio fijo para el mensaje
              }
            }}
          />
        </ThemeProvider>
      )}
    />
  );
};

export default CustomTextFieldFormTs;