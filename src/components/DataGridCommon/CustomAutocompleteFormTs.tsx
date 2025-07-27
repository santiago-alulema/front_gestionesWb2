import React, { useEffect, useState } from 'react';
import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  FieldErrors
} from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { Autocomplete, TextField, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import IOptionByLastLevel from '@/components/DataGridCommon/interfaces/IOptionByLastLevel';

interface CustomAutocompleteFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TOption extends Record<string, any> = any
> {
  control?: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  rules?: any;
  name: FieldPath<TFieldValues>;
  label?: string;
  labelFullField?: string;
  width?: string | number;
  defaultValue?: TOption | TOption[] | null;
  options: TOption[] | IOptionByLastLevel[];
  optionValue?: keyof TOption;
  optionLabel?: keyof TOption;
  elementKey?: string | number;
  requiredField?: boolean;
  handleChange?: (
    element: React.ChangeEvent<{}>,
    data: TOption | TOption[] | null
  ) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
  returnObject?: boolean;
  multipleChoice?: boolean;
  isHierarchicalSelect?: boolean;
  typeHierarchical?: 'ByLastLevel' | 'ByDependence';
}

const CustomAutocompleteFormTs = <
  TFieldValues extends FieldValues = FieldValues,
  TOption extends Record<string, any> = any
>({
  control,
  errors = {},
  rules = {},
  name,
  label = '',
  labelFullField = '',
  width,
  defaultValue = null,
  options = [],
  optionValue = 'id' as keyof TOption,
  optionLabel = 'name' as keyof TOption,
  elementKey = 0,
  requiredField = false,
  handleChange = () => { },
  disabled = false,
  style = {},
  sx = {},
  returnObject = false,
  multipleChoice = false,
  isHierarchicalSelect = false,
  typeHierarchical = 'ByLastLevel'
}: CustomAutocompleteFormProps<TFieldValues, TOption>) => {
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme();
  const [fieldValue, setFieldValue] = useState<TOption | TOption[] | null>(
    defaultValue
  );

  let heightMultiChoice: SxProps<Theme> = {};

  if (multipleChoice) {
    heightMultiChoice = {
      '& .MuiInputBase-root': {
        height: 'auto !important'
      }
    };
  }

  useEffect(() => {
    setFieldValue(defaultValue);
  }, [defaultValue]);

  const getOptionValue = (option: TOption) => {
    return option[optionValue];
  };

  const getOptionLabel = (option: TOption) => {
    return String(option[optionLabel] ?? '');
  };

  const getAutocompleteValue = (currentValue: any, options: any) => {
    if (multipleChoice) {
      if (!Array.isArray(currentValue)) return [];
      return currentValue
        .map(val =>
          options.find(
            (option: TOption) => getOptionValue(option) == getOptionValue(val)
          )
        )
        .filter(Boolean) as TOption[];
    }

    if (!currentValue) return null;

    if (typeof currentValue === 'object' && returnObject) {
      return (
        options.find(
          (option: TOption) =>
            getOptionValue(option) == getOptionValue(currentValue)
        ) || null
      );
    }

    return (
      options.find(
        (option: TOption) => getOptionValue(option) == currentValue
      ) || null
    );
  };

  const isOptionEqual = (option: TOption, value: TOption | any) => {
    return getOptionValue(option) == getOptionValue(value);
  };

  const orderedOptions: HierarchicalOption[] = buildHierarchicalList(
    options as IOptionByLastLevel[]
  );

  const OptionItem = styled('li')<{ level: number }>(({ level }) => ({
    paddingLeft: `${10 + level * 20}px !important`
  }));

  interface HierarchicalOption extends IOptionByLastLevel {
    level: number;
  }

  function buildHierarchicalList(
    items: IOptionByLastLevel[],
    parentId: string | null = null,
    level: number = 0
  ): HierarchicalOption[] {
    const result: HierarchicalOption[] = [];

    const children = items.filter(
      item => (item.dependenceCode ?? null) === parentId
    );

    for (const item of children) {
      const childNodes = buildHierarchicalList(
        items,
        String(item.id),
        level + 1
      );

      const hasValidDescendants = childNodes.length > 0;
      const isLeaf = item.lastLevel === true;

      if (hasValidDescendants || isLeaf) {
        result.push({ ...item, level });
        result.push(...childNodes);
      }
    }

    return result;
  }

  let marginLeftOption = 5;
  let lastWasTrue = false;

  const OptionItemLastLevel = styled('li')<{ lastLevel: boolean }>(({
    lastLevel
  }) => {
    if (lastLevel) {
      if (!lastWasTrue) {
        marginLeftOption += 15;
        lastWasTrue = true;
      }
    } else {
      if (lastWasTrue) {
        marginLeftOption = 5;
      } else {
        marginLeftOption += 5;
      }
      lastWasTrue = false;
    }

    return {
      paddingLeft: `${marginLeftOption}px !important`
    };
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const autocompleteValue = getAutocompleteValue(field.value, options);

        return (
          <Autocomplete
            {...field}
            isOptionEqualToValue={isOptionEqual}
            fullWidth={!width}
            options={
              typeHierarchical === 'ByLastLevel' ? options : orderedOptions
            }
            getOptionDisabled={option =>
              isHierarchicalSelect ? !option.lastLevel : false
            }
            getOptionLabel={getOptionLabel}
            renderOption={(props, option) => {
              if (typeHierarchical === 'ByDependence' && isHierarchicalSelect) {
                return (
                  <OptionItem
                    {...props}
                    level={(option as HierarchicalOption).level}
                  >
                    {option[optionLabel]}
                  </OptionItem>
                );
              }

              if (typeHierarchical === 'ByLastLevel' && isHierarchicalSelect) {
                return (
                  <OptionItemLastLevel {...props} lastLevel={option.lastLevel}>
                    {option[optionLabel]}
                  </OptionItemLastLevel>
                );
              }

              return (
                <li {...props} key={option[optionValue]}>
                  {option[optionLabel]}
                </li>
              );
            }}
            renderInput={params => (
              <TextField
                {...params}
                label={
                  <>
                    {fieldValue || isFocus ? labelFullField : label}
                    {requiredField && (
                      <span
                        style={{ color: theme.palette.error?.main ?? 'red' }}
                      >
                        {' '}
                        *
                      </span>
                    )}
                  </>
                }
                helperText={errors[name]?.message as string | undefined}
                error={!!errors[name]}
                style={style}
                sx={{
                  ...heightMultiChoice,
                  ...sx
                }}
                variant="outlined"
              />
            )}
            key={`Au_${elementKey}`}
            disabled={disabled}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              field.onBlur();
            }}
            onChange={(event, data) => {
              const value = data
                ? returnObject || multipleChoice
                  ? data
                  : getOptionValue(data)
                : null;
              field.onChange(value);
              handleChange(event, data);
              setFieldValue(data);
            }}
            value={autocompleteValue}
            multiple={multipleChoice}
          />
        );
      }}
    />
  );
};

export default CustomAutocompleteFormTs;
