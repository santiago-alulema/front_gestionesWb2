import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface VisualizarImagenProps {
    previewUrl?: string | null;  // <- permite null/undefined
    name?: string;
    onClose?: () => void;        // <- para notificar al padre (opcional)
}

const VizualizarImagen = ({ previewUrl, name = "Imagen", onClose }: VisualizarImagenProps) => {
    const [openPreview, setOpenPreview] = useState(false);

    useEffect(() => {
        setOpenPreview(!!previewUrl);   // abre si hay url, cierra si no
    }, [previewUrl]);

    const handleClose = () => {
        setOpenPreview(false);
        onClose?.(); // avisa al padre (si lo necesita para limpiar previewUrl)
    };

    return (
        <Dialog
            open={openPreview}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>Vista previa</DialogTitle>
            <DialogContent
                dividers
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                {previewUrl ? (
                    <Box
                        component="img"
                        src={previewUrl}
                        alt={name}
                        sx={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 1 }}
                    />
                ) : (
                    // <Typography variant="body2" color="text.secondary">
                    //     No hay imagen para mostrar.
                    // </Typography>
                    ""
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default VizualizarImagen;
