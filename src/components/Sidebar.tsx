import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { JSX, useState } from "react";
import MenuItem from "@/routers/MenuItem";
import Menus from "@/routers/Menus";
import { Dashboard } from "@/components/Graficos/Dashboard";

interface SidebarProps {
  userRole: string;
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [hovered, setHovered] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null>(null);

  const collapsedWidth = 60;
  const expandedWidth = 240;

  const handleToggle = (name: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderMenuItems = (items: MenuItem[], depth: number = 0) =>
    items
      .filter((item) => item.roles.includes(userRole))
      .map((item) => {
        const paddingLeft = hovered ? 2 + depth * 2 : 1;

        if (item.children) {
          return (
            <div key={item.name}>
              <ListItemButton onClick={() => handleToggle(item.name)} sx={{ pl: paddingLeft }}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {hovered && <ListItemText primary={item.name} />}
                {hovered && (openSubmenus[item.name] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {hovered && (
                <Collapse in={openSubmenus[item.name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {renderMenuItems(item.children, depth + 1)}
                  </List>
                </Collapse>
              )}
            </div>
          );
        }

        return (
          <ListItemButton
            key={item.name}
            selected={location.pathname === item.route}
            onClick={() => {
              if (item.component) {
                setSelectedComponent(item.component);
              } else {
                navigate(item.route || "/");
                setSelectedComponent(<Dashboard />);
              }
            }}
            sx={{ pl: paddingLeft }}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            {hovered && <ListItemText primary={item.name} />}
          </ListItemButton>
        );
      });

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        PaperProps={{
          sx: {
            width: hovered ? expandedWidth : collapsedWidth,
            overflowX: "hidden",
            transition: "width 0.3s ease",
            bgcolor: "primary.main",
            color: "#fff",
            mt: 7, // Añade margen superior para el Navbar
            height: `calc(100vh - 56px)`,
          },
        }}
      >
        <List>{renderMenuItems(Menus)}</List>
      </Drawer>
      <div
        style={{
          marginLeft: hovered ? expandedWidth : collapsedWidth,
          padding: "1rem",
        }}
      >
        {!!selectedComponent ? selectedComponent : <Dashboard />}
      </div>
    </>
  );
};

export default Sidebar;
