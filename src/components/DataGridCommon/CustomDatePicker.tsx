import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

dayjs.locale('es');

interface CustomDatePickerProps {
    label?: string;
    defaultValue?: string;
    onChangeValue?: (value: string | null) => void;
    inputFormat?: string;
    returnFormat?: string;
    minDate?: string;
    maxDate?: string;
    requiredField?: boolean;
    disabled?: boolean;
}

const CustomDatePicker = ({
    label = '',
    defaultValue = '',
    onChangeValue = () => { },
    inputFormat = 'DD/MM/YYYY',
    returnFormat = 'YYYY-MM-DD',
    minDate = '1980-01-01',
    maxDate = '',
    requiredField = false,
    disabled = false
}: CustomDatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
        defaultValue ? dayjs(defaultValue) : null
    );
    const [minDateValue, setMinDateValue] = useState<Dayjs | null>(null);
    const [maxDateValue, setMaxDateValue] = useState<Dayjs | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        setMinDateValue(minDate ? dayjs(minDate) : null);
    }, [minDate]);

    useEffect(() => {
        setMaxDateValue(maxDate ? dayjs(maxDate) : null);
    }, [maxDate]);

    const handleChange = (newValue: Dayjs | null) => {
        setSelectedDate(newValue);
        const formatted = newValue?.format(returnFormat) ?? null;
        onChangeValue(formatted);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
                label={
                    <>
                        {label}
                        {requiredField && (
                            <span style={{ color: theme.palette.error.main ?? 'red' }}> *</span>
                        )}
                    </>
                }
                value={selectedDate}
                onChange={handleChange}
                minDate={minDateValue}
                maxDate={maxDateValue}
                format={inputFormat}
                disabled={disabled}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        inputProps: {
                            readOnly: true
                        },
                        onClick: (event) => {
                            event.stopPropagation();
                            const button = event.currentTarget.parentElement?.querySelector('button');
                            if (button) (button as HTMLButtonElement).click();
                        },
                        onFocus: () => setIsFocus(true),
                        onBlur: () => setIsFocus(false)
                    }
                }}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
