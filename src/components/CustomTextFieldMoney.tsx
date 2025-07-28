import { InputAdornment, TextField, TextFieldProps } from "@mui/material"
import { useState } from "react"

interface CustomTextFieldMoneyProps extends Omit<TextFieldProps, 'onChange'> {
    value?: string
    onChange?: (value: string) => void
    currencySymbol?: string
    defaultValue?: string
}

const CustomTextFieldMoney = ({
    value: externalValue,
    onChange,
    currencySymbol = "$",
    defaultValue = "0.0",
    ...props
}: CustomTextFieldMoneyProps) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue)

    const value = externalValue !== undefined ? externalValue : internalValue

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^0-9.]/g, '')

        if (inputValue === '') {
            const newValue = defaultValue
            setInternalValue(newValue)
            onChange?.(newValue)
            return
        }

        if (value === defaultValue && inputValue.length > 0 && inputValue !== defaultValue) {
            const newValue = inputValue.replace(defaultValue, '')
            setInternalValue(newValue)
            onChange?.(newValue)
            return
        }

        if ((inputValue.match(/\./g) || []).length <= 1) {
            setInternalValue(inputValue)
            onChange?.(inputValue)
        }
    }

    const handleBlur = () => {
        if (value === '') {
            const newValue = defaultValue
            setInternalValue(newValue)
            onChange?.(newValue)
        }
    }

    const handleFocus = () => {
        if (value === defaultValue) {
            const newValue = ''
            setInternalValue(newValue)
            onChange?.(newValue)
        }
    }

    return (
        <TextField
            {...props}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={handleValueChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            InputProps={{
                startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                ...props.InputProps
            }}
        />
    )
}

export default CustomTextFieldMoney