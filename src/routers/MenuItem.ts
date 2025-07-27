import { JSX } from "react";

type MenuItem = {
  name: string;
  roles: string[];
  icon?: JSX.Element; 
  route?: string;
  children?: MenuItem[];
  hidden?: boolean;
  exact?: boolean;
  badge?: string | number;
  component?: JSX.Element
};

export default MenuItem;
