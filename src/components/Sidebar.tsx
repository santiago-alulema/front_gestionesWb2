import React, { useState } from "react";
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
import MenuItem from "@/routers/MenuItem";
import Menus from "@/routers/Menus";

interface SidebarProps {
  userRole: string;
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [hovered, setHovered] = useState(false);

  const collapsedWidth = 60;
  const expandedWidth = 240;

  const normalizedRole = userRole.toLowerCase();

  const handleToggle = (name: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderMenuItems = (items: MenuItem[], depth: number = 0) =>
    items
      .filter((item) =>
        item.roles
          .map((r) => r.toLowerCase())
          .includes(normalizedRole)
      )
      .map((item) => {
        const paddingLeft = hovered ? 2 + depth * 2 : 1;

        if (item.children) {
          const isActiveSubmenu = item.children.some(
            (child) => child.route === location.pathname
          );
          const isOpen = openSubmenus[item.name] || isActiveSubmenu;

          return (
            <React.Fragment key={`${depth}-${item.name}`}>
              <ListItemButton
                onClick={() => handleToggle(item.name)}
                sx={{ pl: paddingLeft }}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {hovered && <ListItemText primary={item.name} />}
                {hovered && (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {hovered && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {renderMenuItems(item.children, depth + 1)}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        }

        return (
          <ListItemButton
            key={`${depth}-${item.name}`}
            selected={location.pathname === item.route}
            onClick={() => {
              if (item.route) {
                navigate(item.route);
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
          mt: 7,
          height: `calc(100vh - 56px)`,
        },
      }}
    >
      <List>{renderMenuItems(Menus)}</List>
    </Drawer>
  );
};

export default Sidebar;
