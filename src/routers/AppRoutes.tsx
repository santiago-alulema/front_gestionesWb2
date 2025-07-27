// src/App.tsx o src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DynamicRoutes } from "./DynamicRoutes";
import { Dashboard } from "@/components/Graficos/Dashboard";
import Index from "@/components/Index";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />}>
                    {DynamicRoutes()}
                    <Route path="*" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
