// src/Pages/MensajesWhatsapp/Configurations/ConfiguracionColumnasMensajesWhatsapp.ts
import { Column } from "@devexpress/dx-react-grid";
import { useMemo } from "react";

export const ConfiguracionColumnasMensajesWhatsapp = () => {
    const columns = useMemo<Column[]>(
        () => [
            { name: "mensaje", title: "Mensaje", width: "60%", align: "center" as any },
            { name: "tipoMensaje", title: "Tipo", width: "20%", align: "center" as any },
            {
                name: "actions",
                title: "",
                getCellValue: (row: any) => row,
                width: "20%",
                align: "center" as any,
                hiddenFilterColumn: true,
            },
        ],
        []
    );
    return columns;
};
