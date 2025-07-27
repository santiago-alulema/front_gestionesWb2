import { ReactNode } from 'react';

interface IButtonOptionsProps {
  icon?: ReactNode;
  title: String;
  onClick?: () => void;
}

export default IButtonOptionsProps;
