import React, { useState, useEffect } from 'react';
import {
    Controller,
    Control,
    FieldValues,
    FieldPath,
    FieldErrors,
    UseControllerProps
} from 'react-hook-form';
import { InputAdornment, TextField, TextFieldProps, SxProps, Theme } from "@mui/material";

interface CustomTextFieldMoneyFormProps<
    TFieldValues extends FieldValues = FieldValues
> extends Omit<TextFieldProps, 'onChange' | 'name'> {
    control?: Control<any>;
    errors?: FieldErrors<TFieldValues>;
    rules?: UseControllerProps<any>['rules'];
    name: FieldPath<TFieldValues>;
    label?: string;
    labelFullField?: string;
    width?: string | number;
    currencySymbol?: string;
    defaultValue?: any;
    style?: React.CSSProperties;
    sx?: SxProps<Theme>;
    elementKey?: string | number;
}

const CustomTextFieldMoneyForm = <TFieldValues extends FieldValues = FieldValues>({
    control,
    errors = {},
    rules = {},
    name,
    label = '',
    labelFullField = '',
    width,
    currencySymbol = "$",
    defaultValue = "0.0",
    style = {},
    sx = {},
    elementKey = 0,
    ...props
}: CustomTextFieldMoneyFormProps<TFieldValues>) => {
    const [isFocus, setIsFocus] = useState(false);
    const [internalValue, setInternalValue] = useState<string>(defaultValue);

    const handleValueChange = (value: string, onChange: (value: string) => void) => {
        const inputValue = value.replace(/[^0-9.]/g, '');

        if (inputValue === '') {
            const newValue = defaultValue;
            setInternalValue(newValue);
            onChange(newValue);
            return;
        }

        if (internalValue === defaultValue && inputValue.length > 0 && inputValue !== defaultValue) {
            const newValue = inputValue.replace(defaultValue, '');
            setInternalValue(newValue);
            onChange(newValue);
            return;
        }

        if ((inputValue.match(/\./g) || []).length <= 1) {
            setInternalValue(inputValue);
            onChange(inputValue);
        }
    };

    const handleBlur = (onBlur: () => void) => {
        setIsFocus(false);
        if (internalValue === '') {
            const newValue = defaultValue;
            setInternalValue(newValue);
            onBlur();
        } else {
            onBlur();
        }
    };

    const handleFocus = () => {
        setIsFocus(true);
        if (internalValue === defaultValue) {
            const newValue = '';
            setInternalValue(newValue);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref } }) => {
                // Sincronizar el valor interno cuando cambia el valor del control
                useEffect(() => {
                    if (value !== undefined && value !== internalValue) {
                        setInternalValue(value);
                    }
                }, [value]);

                return (
                    <TextField
                        {...props}
                        inputRef={ref}
                        type="text"
                        inputMode="numeric"
                        value={internalValue}
                        onChange={(e) => handleValueChange(e.target.value, onChange)}
                        onBlur={() => handleBlur(onBlur)}
                        onFocus={handleFocus}
                        label={
                            <>
                                {value || isFocus ? labelFullField || label : label}
                                {rules?.required && (
                                    <span style={{ color: 'red' }}> *</span>
                                )}
                            </>
                        }
                        error={!!errors[name]}
                        helperText={errors[name]?.message as string | undefined}
                        style={style}
                        sx={{
                            width: width ? width : '100%',
                            ...sx
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                            ...props.InputProps,
                            sx: {
                                height: '56px',
                                padding: '16px 14px',
                                ...props.InputProps?.sx
                            },
                        }}
                        key={`Money_${elementKey}`}
                    />
                );
            }}
        />
    );
};

export default CustomTextFieldMoneyForm;