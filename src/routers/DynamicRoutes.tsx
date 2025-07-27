// src/routes/DynamicRoutes.tsx
import { Route } from "react-router-dom";
import Menus from "@/routers/Menus";
import MenuItem from "@/routers/MenuItem";
import React from "react";
import { JSX } from "react/jsx-runtime";

const renderRoutes = (items: MenuItem[]): JSX.Element[] => {
    const routes: JSX.Element[] = [];

    const traverse = (menuList: MenuItem[]) => {
        menuList.forEach((item) => {
            if (item.route && item.component) {
                routes.push(<Route key={item.route} path={item.route} element={item.component} />);
            }
            if (item.children) {
                traverse(item.children);
            }
        });
    };

    traverse(items);
    return routes;
};

export const DynamicRoutes = () => renderRoutes(Menus);
