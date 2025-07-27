import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface OptionType {
  [key: string]: any;
  id?: string | number;
  name?: string;
}

interface CustomAutocompleteProps {
  label?: string;
  labelFullField?: string;
  width?: number | null;
  defaultValue?: OptionType | null;
  options: OptionType[];
  optionValue?: string;
  optionLabel?: string;
  elementKey?: number;
  requiredField?: boolean;
  handleChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: OptionType | null
  ) => void;
  disabled?: boolean;
  errorField?: boolean;
  message?: string;
}

const CustomAutocompleteTs = ({
  label = '',
  labelFullField = '',
  width = null,
  defaultValue = null,
  options = [],
  optionValue = 'id',
  optionLabel = 'name',
  elementKey = 0,
  requiredField = false,
  handleChange = () => { },
  disabled = false,
  errorField = false,
  message = ''
}: CustomAutocompleteProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [fieldValue, setFieldValue] = useState<OptionType | null>(defaultValue);

  useEffect(() => {
    setFieldValue(defaultValue);
  }, [defaultValue]);

  return (
    <Autocomplete
      isOptionEqualToValue={(option: OptionType, value: OptionType) =>
        value == null || option[optionValue] === value[optionValue]
      }
      fullWidth={!width}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      options={options}
      getOptionLabel={(option: OptionType) => option?.[optionLabel] ?? ''}
      renderOption={(props, option) => (
        <li {...props} key={option[optionValue]}>
          {option[optionLabel]}
        </li>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label={
            <>
              {!!fieldValue || isFocus ? labelFullField : label}
              {requiredField && <span style={{ color: 'red' }}> *</span>}
            </>
          }
          error={errorField}
          helperText={errorField ? message : ''}
        />
      )}
      key={`Autocomplete_${elementKey}`}
      disabled={disabled}
      onChange={(event, value) => {
        setFieldValue(value);
        handleChange(event, value);
      }}
      value={fieldValue}
    />
  );
};

export default CustomAutocompleteTs;
