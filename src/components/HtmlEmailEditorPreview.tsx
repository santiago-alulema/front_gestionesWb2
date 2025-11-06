import React, { useEffect, useRef, useState } from "react";
import { Box, ButtonGroup, Button, Typography, Grid } from "@mui/material";
// Grid v2:

type Props = {
    initialHtml?: string;                  // tu HTML completo (p.ej. seleccionarMensaje?.mensajeCorreo)
    onChangeHtml?: (value: string) => void; // te devuelve el HTML editado (outerHTML)
    height?: number;                        // alto de la vista previa
};

export default function HtmlEmailWysiwygPreview({
    initialHtml = "",
    onChangeHtml,
    height = 640,
}: Props) {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const [ready, setReady] = useState(false);
    const [html, setHtml] = useState(initialHtml);

    // Carga el HTML en el iframe cada vez que cambia `html`
    useEffect(() => {
        if (!iframeRef.current) return;
        const iframe = iframeRef.current;
        // Forzamos recarga del documento
        iframe.srcdoc = html || "<!doctype html><html><head></head><body></body></html>";
    }, [html]);

    // Al montar o cuando cambia `initialHtml`, actualiza el estado local
    useEffect(() => {
        setHtml(initialHtml || "");
    }, [initialHtml]);

    // Habilitar edición dentro del iframe cuando termine de cargar
    const handleIframeLoad = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Activar modo edición para todo el documento
        try {
            // Algunos motores requieren designMode; otros con contentEditable en body basta
            doc.designMode = "on";
            if (doc.body) doc.body.contentEditable = "true";
        } catch {
            // si falla, al menos contentEditable en body
            if (doc.body) doc.body.contentEditable = "true";
        }

        // Opcional: estilo sutil para que el usuario vea que es editable (no ensucia tu correo)
        const helperStyle = doc.createElement("style");
        helperStyle.textContent = `
      body:focus { outline: none; }
      ::selection { background: rgba(180, 213, 255, .6); }
    `;
        doc.head?.appendChild(helperStyle);

        // Notificar cambios al escribir/pegar
        const notifyChange = () => {
            const fullHtml = doc.documentElement?.outerHTML || "";
            onChangeHtml?.(fullHtml);
        };

        // Escuchar eventos típicos de edición
        doc.addEventListener("input", notifyChange);
        doc.addEventListener("keyup", notifyChange);
        doc.addEventListener("paste", notifyChange);

        setReady(true);
    };

    // Utilidad para ejecutar comandos de formato dentro del iframe
    const exec = (cmd: string, value?: string) => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;
        // Los comandos clásicos aún funcionan bien para casos básicos
        doc.execCommand(cmd, false, value ?? "");
        // Tras aplicar formato, propagar HTML hacia fuera
        const fullHtml = doc.documentElement?.outerHTML || "";
        onChangeHtml?.(fullHtml);
    };

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Previsualización editable (WYSIWYG)
                </Typography>

                {/* Barra simple de herramientas */}
                <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                    <ButtonGroup size="small" variant="outlined">
                        <Button onClick={() => exec("bold")}>Negrita</Button>
                        <Button onClick={() => exec("italic")}>Cursiva</Button>
                        <Button onClick={() => exec("underline")}>Subrayado</Button>
                    </ButtonGroup>
                    <ButtonGroup size="small" variant="outlined">
                        <Button onClick={() => exec("insertUnorderedList")}>• Lista</Button>
                        <Button onClick={() => exec("insertOrderedList")}>1. Lista</Button>
                    </ButtonGroup>
                    <ButtonGroup size="small" variant="outlined">
                        <Button onClick={() => exec("undo")}>Deshacer</Button>
                        <Button onClick={() => exec("redo")}>Rehacer</Button>
                    </ButtonGroup>
                    <ButtonGroup size="small" variant="outlined">
                        <Button
                            onClick={() => {
                                const url = prompt("URL del enlace:", "https://");
                                if (url) exec("createLink", url);
                            }}
                        >
                            Enlace
                        </Button>
                        <Button onClick={() => exec("unlink")}>Quitar enlace</Button>
                    </ButtonGroup>
                </Box>

                <Box
                    sx={{
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        overflow: "hidden",
                        bgcolor: "background.paper",
                        height,
                    }}
                >
                    {/* Importante: permitir scripts para activar designMode; same-origin para poder acceder al doc */}
                    <iframe
                        ref={iframeRef}
                        title="editable-preview"
                        style={{ width: "100%", height: "100%", border: 0 }}
                        sandbox="allow-same-origin allow-scripts"
                        onLoad={handleIframeLoad}
                    />
                </Box>

                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                    Tip: Haz clic en el texto y edítalo directamente. Los estilos embebidos del correo se mantienen.
                </Typography>
            </Grid>

            {/* <Grid size={{ xs: 12, lg: 6 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    HTML resultante (solo lectura)
                </Typography>
                <Box
                    component="pre"
                    sx={{
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        p: 1.5,
                        height,
                        overflow: "auto",
                        fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        fontSize: 12.5,
                        m: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        bgcolor: "background.paper",
                    }}
                >
                    {(() => {
                        // mostramos lo último que el padre nos dio por onChangeHtml (si existe),
                        // como este componente no guarda copia del HTML editado, el dueño decidirá
                        // si persiste en estado superior. Para demo, reflejamos `initialHtml` actualizado si el padre lo reinyecta.
                        return initialHtml || html;
                    })()}
                </Box>
            </Grid> */}
        </Grid>
    );
}
