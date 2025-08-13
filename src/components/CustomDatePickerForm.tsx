import React, { useEffect, useState } from 'react';
import {
    Controller,
    Control,
    FieldValues,
    FieldPath,
    FieldErrors
} from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { TextField, SxProps, Theme } from '@mui/material';

dayjs.locale('es');

interface CustomDatePickerFormProps<
    TFieldValues extends FieldValues = FieldValues
> {
    control?: Control<TFieldValues>;
    errors?: FieldErrors<TFieldValues>;
    rules?: any;
    name: FieldPath<TFieldValues>;
    label?: string;
    labelFullField?: string;
    width?: string | number;
    defaultValue?: any;
    inputFormat?: string;
    returnFormat?: string;
    minDate?: string;
    maxDate?: string;
    requiredField?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    sx?: SxProps<Theme>;
    elementKey?: string | number;
}

const CustomDatePickerForm = <TFieldValues extends FieldValues = FieldValues>({
    control,
    errors = {},
    rules = {},
    name,
    label = '',
    labelFullField = '',
    width,
    defaultValue = '',
    inputFormat = 'DD/MM/YYYY',
    returnFormat = 'YYYY-MM-DD',
    minDate = '1980-01-01',
    maxDate = '',
    requiredField = false,
    disabled = false,
    style = {},
    sx = {},
    elementKey = 0,
}: CustomDatePickerFormProps<TFieldValues>) => {
    const [isFocus, setIsFocus] = useState(false);
    const [minDateValue, setMinDateValue] = useState<Dayjs | null>(null);
    const [maxDateValue, setMaxDateValue] = useState<Dayjs | null>(null);
    const theme = useTheme();

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
                defaultValue={defaultValue}
                rules={{
                    required: requiredField ? 'Este campo es requerido' : false,
                    ...rules,
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                    <DatePicker
                        label={
                            <>
                                {value || isFocus ? labelFullField || label : label}
                                {requiredField && (
                                    <span style={{ color: theme.palette.error.main ?? 'red' }}>
                                        {' '}
                                        *
                                    </span>
                                )}
                            </>
                        }
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => {
                            const formatted = newValue?.format(returnFormat) ?? null;
                            onChange(formatted);
                        }}
                        minDate={minDateValue}
                        maxDate={maxDateValue}
                        format={inputFormat}
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                fullWidth: !width,
                                variant: 'outlined',
                                error: !!errors[name],
                                helperText: errors[name]?.message as string | undefined,
                                style: style,
                                sx: sx,
                                inputProps: {
                                    readOnly: true,
                                },
                                onClick: (event) => {
                                    event.stopPropagation();
                                    const button = event.currentTarget.parentElement?.querySelector('button');
                                    if (button) (button as HTMLButtonElement).click();
                                },
                                onFocus: () => setIsFocus(true),
                                onBlur: () => {
                                    setIsFocus(false);
                                    onBlur();
                                },
                            },
                        }}
                        key={`Date_${elementKey}`}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePickerForm;