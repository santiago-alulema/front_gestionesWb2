// AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Menus from "@/routers/Menus";
import { JSX } from "react";

const AppRoutes = () => {
    const flattenRoutes = (items: typeof Menus) => {
        let routes: { path: string; element: JSX.Element }[] = [];

        const traverse = (menuItems: typeof Menus) => {
            for (const item of menuItems) {
                if (item.route && item.component) {
                    routes.push({ path: item.route, element: item.component });
                }
                if (item.children) {
                    traverse(item.children);
                }
            }
        };

        traverse(items);
        return routes;
    };

    const routes = flattenRoutes(Menus);

    return (
        <Routes>
            {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
