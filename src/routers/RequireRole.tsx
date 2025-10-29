// src/routers/RequireRole.tsx
import React from "react";
import { useLogin } from "@/context/LoginContext";
import NotFound from "@/components/DataGridCommon/NotFound";

interface Props {
    allow: string[];                 // roles permitidos del menú
    children: React.ReactElement;    // la página a renderizar si hay permiso
}

const RequireRole: React.FC<Props> = ({ allow, children }) => {
    const { userData } = useLogin();
    const userRole = userData?.role?.toLowerCase?.() ?? "";

    const canPass = allow
        ?.map((r) => r.toLowerCase())
        .includes(userRole);

    if (!canPass) {
        return (
            <NotFound
                title="Sin permiso"
                text="No tienes acceso a esta sección. Verifica tu rol o vuelve al inicio."
            />
        );
    }

    return children;
};

export default RequireRole;
