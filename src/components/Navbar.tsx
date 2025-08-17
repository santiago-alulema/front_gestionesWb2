import React, { useState, MouseEvent } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
    userName: string;
    onLogout: () => void;
    onToggleSidebar: () => void;
}

const Navbar = ({ userName, onLogout, onToggleSidebar }: NavbarProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        onLogout();
    };

    return (
        <AppBar
            elevation={0}
            position="fixed"
            color="primary"

            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, maxHeight: 48 }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",  // verticalmente centrado
                    justifyContent: "space-between",
                    maxHeight: 48,          // altura estándar MUI
                    px: 1,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={onToggleSidebar}
                        sx={{ mr: 1, display: { xs: "block", sm: "none" }, p: 0.5 }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ fontSize: "0.9rem", lineHeight: 1 }}>
                        Gestiones Web
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>  {/* <--- Aseguramos flex y centrado */}
                    <IconButton color="inherit" onClick={handleMenuClick} sx={{ gap: 0.5, p: 0.5 }}>
                        <Avatar sx={{ width: 28, height: 28 }}>
                            <AccountCircleIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="body2" sx={{ fontSize: "0.75rem", lineHeight: 1 }}>
                            {userName}
                        </Typography>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>

        </AppBar>


    );
};

export default Navbar;
