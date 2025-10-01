import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import {
    Box,
    Typography,
    IconButton,
    Stack,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Chip,
} from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export type ImageDropzoneProps = {
    value?: File | null;
    onChange?: (file: File | null) => void;
    maxSizeMb?: number;
    accept?: { [mime: string]: string[] };
    helperText?: string;
    disabled?: boolean;
};

// const defaultAccept = { "image/*": [] };
const defaultAccept: Accept = { "image/*": [] };

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
    value = null,
    onChange,
    maxSizeMb = 5,
    accept = defaultAccept,
    helperText = "Arrastra y suelta una imagen aquí o haz clic para seleccionar",
    disabled = false,
}) => {
    const [file, setFile] = useState<File | null>(value);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [openPreview, setOpenPreview] = useState(false);
    const maxSizeBytes = useMemo(() => maxSizeMb * 1024 * 1024, [maxSizeMb]);

    // Generar / limpiar URL de preview
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [file]);

    // Sincroniza valor inicial externo si cambia
    useEffect(() => {
        setFile(value ?? null);
    }, [value]);

    const onDrop = useCallback(
        (accepted: File[], rejected: any[]) => {
            if (rejected && rejected.length > 0) {
                // Podrías mapear y mostrar mensajes más detallados aquí si quieres
                console.warn("Archivos rechazados:", rejected);
            }
            const first = accepted[0];
            if (first) {
                setFile(first);
                onChange?.(first);
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            accept,
            maxSize: maxSizeBytes,
            multiple: false,
            disabled,
        });

    const clearFile = () => {
        setFile(null);
        onChange?.(null);
    };

    const hasError = fileRejections.length > 0;

    return (
        <Stack spacing={1.5}>
            <Box
                {...getRootProps()}
                sx={{
                    p: 1,
                    border: "2px dashed",
                    borderColor: hasError ? "error.main" : isDragActive ? "primary.main" : "divider",
                    borderRadius: 2,
                    bgcolor: disabled ? "action.disabledBackground" : "background.paper",
                    cursor: disabled ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    transition: "border-color 120ms ease",
                }}
            >
                <input {...getInputProps()} />
                <ImageSearchIcon color={hasError ? "error" : "action"} />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {isDragActive ? "Suelta la imagen…" : "Sube una imagen"}
                    </Typography>
                    <Typography variant="body2" color={hasError ? "error.main" : "text.secondary"}>
                        {helperText} (máx. {maxSizeMb} MB)
                    </Typography>
                </Box>
                {file && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconButton
                            aria-label="Ver imagen"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenPreview(true);
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Eliminar imagen"
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearFile();
                            }}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Stack>
                )}
            </Box>

            {file && (
                <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                        variant="outlined"
                        label={file.name}
                        sx={{ maxWidth: 300 }}
                        color="success"

                    />
                    <Typography variant="caption" color="success">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB <strong>( IMAGEN SUBIDA )</strong>
                    </Typography>
                </Stack>
            )}

            {hasError && (
                <Box>
                    {fileRejections.map((rej, i) => (
                        <Typography key={i} variant="caption" color="error.main">
                            {rej?.errors?.[0]?.message ?? "Archivo no permitido o demasiado grande."}
                        </Typography>
                    ))}
                </Box>
            )}

            {/* Modal de previsualización */}
            <Dialog
                open={openPreview}
                onClose={() => setOpenPreview(false)}
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
                            alt={file?.name ?? "preview"}
                            sx={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 1 }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No hay imagen para mostrar.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPreview(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default ImageDropzone;
