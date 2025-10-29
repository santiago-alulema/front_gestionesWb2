// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Menus from "@/routers/Menus";
import { JSX } from "react";
import RequireRole from "@/routers/RequireRole";
import NotFound from "@/components/DataGridCommon/NotFound";

const AppRoutes = () => {
    const flattenRoutes = (items: typeof Menus) => {
        let routes: { path: string; element: JSX.Element; roles: string[] }[] = [];

        const traverse = (menuItems: typeof Menus) => {
            for (const item of menuItems) {
                if (item.route && item.component) {
                    routes.push({
                        path: item.route,
                        element: item.component,
                        roles: item.roles ?? [], // usa los roles definidos en Menus
                    });
                }
                if (item.children) traverse(item.children);
            }
        };

        traverse(items);
        return routes;
    };

    const routes = flattenRoutes(Menus);

    return (
        <Routes>
            {/* Ajusta tu landing deseado */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {routes.map(({ path, element, roles }) => (
                <Route
                    key={path}
                    path={path}
                    element={<RequireRole allow={roles}>{element}</RequireRole>}
                />
            ))}

            {/* Rutas no encontradas */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
