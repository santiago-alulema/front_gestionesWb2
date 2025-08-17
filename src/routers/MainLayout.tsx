import { useState } from "react";
import { useLogin } from "@/context/LoginContext";
import Sidebar from "@/components/Sidebar";
import AppRoutes from "./AppRoutes";
import Navbar from "@/components/Navbar";

const MainLayout = () => {
    const { userData, logout } = useLogin();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    if (!userData) return null;

    return (
        <div style={{ display: "flex" }}>
            {sidebarOpen && <Sidebar userRole={userData.role} />}
            <div style={{ flex: 1 }}>
                <Navbar
                    userName={userData.fullName}
                    onLogout={logout}
                    onToggleSidebar={handleToggleSidebar}
                />
                <div style={{ paddingLeft: "4rem", paddingTop: 30, marginTop: 50 }}>
                    <AppRoutes />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
