import React from "react";
import {
    Control,
    Controller,
    FieldValues,
    RegisterOptions,
    FieldErrors,
    FieldPath,
} from "react-hook-form";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
} from "@mui/material";

interface Option {
    label: string;
    value: string;
}

interface CustomCheckboxGroupProps<T extends FieldValues> {
    name: FieldPath<T>;
    label?: string;
    control: Control<T>;
    rules?: Omit<RegisterOptions<T>, "valueAsNumber" | "valueAsDate" | "setValueAs">;
    options: Option[];
    errors?: FieldErrors<T>;
    defaultValue?: string[];
    required?: boolean;
    disabled?: boolean;
    onChangeItem?: (value: string, checked: boolean) => void; // <-- Nueva prop
}

function CustomCheckboxGroup<T extends FieldValues>({
    name,
    label,
    control,
    rules,
    options,
    errors,
    defaultValue = [],
    required = false,
    disabled = false,
    onChangeItem,
}: CustomCheckboxGroupProps<T>) {
    const combinedRules = {
        ...rules,
        ...(required && {
            validate: (value: string[]) => {
                if (!value || value.length === 0) {
                    return "Este campo es requerido";
                }
                return true;
            },
        }),
    };

    return (
        <div>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                rules={combinedRules}
                defaultValue={defaultValue as any}
                render={({ field }) => {
                    const valueArray: string[] = Array.isArray(field.value)
                        ? field.value
                        : [];

                    const handleChange = (optionValue: string) => {
                        const isChecked = !valueArray.includes(optionValue);
                        const newValues = isChecked
                            ? [...valueArray, optionValue]
                            : valueArray.filter((v) => v !== optionValue);

                        field.onChange(newValues);

                        // 🔔 Llamar al handler externo si se proporciona
                        if (onChangeItem) {
                            onChangeItem(optionValue, isChecked);
                        }
                    };

                    return (
                        <FormGroup>
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    control={
                                        <Checkbox
                                            checked={valueArray.includes(option.value)}
                                            onChange={() => handleChange(option.value)}
                                            disabled={disabled}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                    );
                }}
            />
            {errors && errors[name] && (
                <FormHelperText error>
                    {(errors[name]?.message as string) || "Selección inválida"}
                </FormHelperText>
            )}
        </div>
    );
}

export default CustomCheckboxGroup;
