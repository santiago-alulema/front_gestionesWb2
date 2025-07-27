export type IActionConfig<T = any> = {
  icon?: React.ReactNode;
  inputSize?: string;
  tooltip: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  onClick: (row: T) => void;
  hidden?: boolean | ((row: T) => boolean);
  sizeIcon: 'small' | 'medium' | 'large';
  typeInput?: 'button' | 'checkbox' | 'icon' | 'radiobutton';
  label?: String;
};
