import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography, Stack } from "@mui/material";

/**
 * Componente de barra de progreso para mostrar el envío de mensajes.
 * Permite indicar cuántos mensajes se han enviado y el total.
 */

interface BarraEnvioMensajesProps {
    /** Número de mensaje actual */
    actual: number;
    /** Total de mensajes */
    total: number;
}

const BarraEnvioMensajes: React.FC<BarraEnvioMensajesProps> = ({ actual, total }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (total > 0) {
            const percent = Math.min(100, Math.round((actual / total) * 100));
            setProgress(percent);
        }
    }, [actual, total]);

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 1,
                width: "100%",
            }}
        >
            <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                    Enviando mensaje {actual} de {total}
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 10, borderRadius: 10 }}
                />

                <Typography variant="caption" color="text.secondary" textAlign="right">
                    {progress}% completado
                </Typography>
            </Stack>
        </Box>
    );
};

export default BarraEnvioMensajes;
