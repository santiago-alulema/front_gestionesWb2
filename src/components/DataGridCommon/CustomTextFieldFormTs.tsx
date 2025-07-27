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
  control?: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  rules?: any;
  name: FieldPath<TFieldValues>;
  defaultValue?: String;
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
  onChange = () => {},
  onKeyPress = () => {},
  endAdornment = null,
  multiline = false,
  rows = 0
}: ICustomTextFieldFormProps) => {
  const theme = useTheme();
  const [fieldValue, setFieldValue] = useState(defaultValue);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <ThemeProvider theme={theme}>
            <TextField
              {...field}
              variant="outlined"
              label={
                <>
                  {' '}
                  {!!fieldValue || isFocus ? labelFullField : label}
                  {requiredField && (
                    <span
                      style={{
                        color: theme.palette.error?.main ?? 'red'
                      }}
                    >
                      {' '}
                      *
                    </span>
                  )}
                </>
              }
              fullWidth={!width}
              style={{ ...style, width: width }}
              helperText={errors[name]?.message as string | undefined}
              error={!!errors[name]}
              disabled={disabled}
              onChange={(event: any) => {
                if (event.target.value.trim() == '') {
                  event.target.value = null;
                }
                field.onChange(event);
                setFieldValue(event.target.value);
                onChange(event.target.value);
              }}
              onKeyPress={onKeyPress}
              onFocus={() => setIsFocus(true)}
              onBlur={event => {
                setIsFocus(false);
                field.onBlur();
              }}
              value={field.value || ''}
              InputProps={{
                ...inputProps,
                endAdornment: endAdornment
              }}
              multiline={multiline}
              rows={multiline ? rows : 0}
            />
          </ThemeProvider>
        )}
      />
    </>
  );
};

export default CustomTextFieldFormTs;
