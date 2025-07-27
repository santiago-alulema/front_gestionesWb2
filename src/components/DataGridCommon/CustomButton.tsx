import {
  Button,
  ButtonPropsColorOverrides,
  ButtonPropsSizeOverrides,
  SvgIconProps
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

interface Props {
  title: string;
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsColorOverrides
  >;
  executeFunction: () => void | Promise<void>;
  icon?: React.ReactElement<SvgIconProps>;
  sx?: Object | null;
  isRounded?: boolean;
  className?: String;
  size?: OverridableStringUnion<
    'small' | 'medium' | 'large',
    ButtonPropsSizeOverrides
  >;
  disabled?: boolean;
}

const CustomButton = ({
  title = '',
  color = 'primary',
  executeFunction,
  icon = null,
  sx = null,
  isRounded = true,
  className = '',
  size = 'small',
  disabled = false
}: Props) => {
  return (
    <Button
      sx={sx}
      color={color}
      onClick={executeFunction}
      variant="contained"
      className={(isRounded ? 'roundedButton' : '') + ' ' + className}
      size={size}
      disabled={disabled}
    >
      {icon ?? ''}
      {title}
    </Button>
  );
};

export default CustomButton;
