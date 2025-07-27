import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { useState, useEffect, FC } from 'react';
import {
  Controller,
  Control,
  RegisterOptions,
  FieldErrors
} from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

dayjs.locale('es');

interface CustomDatePickerFormPropsTs {
  label?: string;
  labelFullField?: string;
  defaultValue?: string;
  onChangeValue?: (value: string | null) => void;
  inputFormat?: string;
  returnFormat?: string;
  mask?: string;
  nameInput?: string;
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
  errors?: FieldErrors;
  minDate?: string;
  maxDate?: string;
  requiredField?: boolean;
  disabled?: boolean;
}

const CustomDatePickerFormPropsFormTs = ({
  label = '',
  labelFullField = '',
  defaultValue = '',
  onChangeValue = () => { },
  inputFormat = 'DD/MM/YYYY',
  returnFormat = 'YYYY-MM-DD',
  mask = '__/__/____',
  nameInput = 'inputPicker',
  control,
  name,
  rules,
  errors = {},
  minDate = '1980-01-01',
  maxDate = '',
  requiredField = false,
  disabled = false
}: CustomDatePickerFormPropsTs) => {
  const [minDateValue, setMinDateValue] = useState<Dayjs | null>(null);
  const [maxDateValue, setMaxDateValue] = useState<Dayjs | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme();

  const onHandleChange = (value: string | null) => {
    onChangeValue(value);
  };

  useEffect(() => {
    setMinDateValue(minDate ? dayjs(minDate) : null);
  }, [minDate]);

  useEffect(() => {
    setMaxDateValue(maxDate ? dayjs(maxDate) : null);
  }, [maxDate]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error }
        }) => (
          <DatePicker
            label={
              <>
                {(!value && isFocus) || !value ? labelFullField : label}
                {requiredField && (
                  <span style={{ color: theme.palette.error.main ?? 'red' }}>
                    {' '}
                    *
                  </span>
                )}
              </>
            }
            value={value ? dayjs(value) : null}
            onChange={(newValue: Dayjs | null) => {
              const formatted = newValue?.format(returnFormat) ?? null;
              onHandleChange(formatted);
              onChange(formatted);
            }}
            minDate={minDateValue}
            maxDate={maxDateValue}
            format={inputFormat}
            disabled={disabled}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                error: !!error,
                helperText: error?.message,
                inputProps: {
                  readOnly: true
                },
                onClick: event => {
                  event.stopPropagation();
                  const button =
                    event.currentTarget.parentElement?.querySelector('button');
                  if (button) (button as HTMLButtonElement).click();
                },
                onFocus: () => setIsFocus(true),
                onBlur: (event: any) => {
                  setIsFocus(false);
                  onBlur();
                }
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePickerFormPropsFormTs;
