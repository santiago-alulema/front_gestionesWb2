import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import { IconButton, Tooltip, Button, Checkbox, Radio } from '@mui/material';

interface WithChecked {
  isChecked?: boolean;
}

interface ActionColumnProps<T> {
  row: T;
  actions: IActionConfig<T>[];
}

export const ActionColumn = <T extends object>({
  row,
  actions
}: ActionColumnProps<T>) => {
  const styleInput = (action: IActionConfig) => {
    return {
      '& .MuiSvgIcon-root': {
        fontSize: action.inputSize ?? '20px'
      }
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      {actions.map((action, index) => {
        const isHidden =
          typeof action.hidden === 'function'
            ? action.hidden(row)
            : action.hidden;
        if (isHidden) return null;
        const handleClick = () => action.onClick(row);
        return (
          <Tooltip key={index} title={action.tooltip || ''}>
            <>
              {(action.typeInput === 'icon' || !action.typeInput) && (
                <IconButton
                  onClick={handleClick}
                  size={action.sizeIcon}
                  color={action.color || 'primary'}
                >
                  {action.icon}
                </IconButton>
              )}
              {action.typeInput === 'button' && (
                <Button
                  onClick={handleClick}
                  size={action.sizeIcon}
                  color={action.color || 'primary'}
                  variant="contained"
                  startIcon={action.icon}
                >
                  {action.label}
                </Button>
              )}
              {action.typeInput === 'checkbox' && (
                <Checkbox
                  sx={styleInput(action)}
                  onChange={handleClick}
                  color={action.color || 'primary'}
                  checked={
                    'isChecked' in row ? (row as WithChecked).isChecked : false
                  }
                />
              )}
              {action.typeInput === 'radiobutton' && (
                <Radio
                  sx={styleInput(action)}
                  onChange={handleClick}
                  color={action.color || 'primary'}
                  checked={
                    'isChecked' in row ? (row as WithChecked).isChecked : false
                  }
                />
              )}
            </>
          </Tooltip>
        );
      })}
    </div>
  );
};
