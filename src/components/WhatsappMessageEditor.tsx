import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Popover,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Props = {
    initialText?: string;
    // Variables disponibles para insertar como {{clave}}
    placeholders?: string[]; // p.ej. ["nombre","contrato","valorDeuda"]
    // Límite de caracteres (WhatsApp ~4096)
    maxLength?: number;
    // Cuando el texto cambia
    onChangeText?: (t: string) => void;
    // Enviar prueba (opcional)
    onSendTest?: (phone: string, text: string) => Promise<void> | void;
    esActualizar?: boolean,
    onChange?: (t: string) => void;
    updateMensaje?: () => void;
};

const COMMON_EMOJIS = [
    "😀", "😁", "😂", "🤣", "😊", "😍", "😘", "😎", "🤝", "👍", "🙏",
    "💪", "🎉", "✅", "⚠️", "❗", "📞", "📆", "💵", "📍", "🧾"
];

function insertAtCursor(textarea: HTMLTextAreaElement, snippet: string) {
    const { selectionStart = 0, selectionEnd = 0, value } = textarea;
    const next = value.slice(0, selectionStart) + snippet + value.slice(selectionEnd);
    const cursor = selectionStart + snippet.length;
    return { next, cursor };
}

function escapeHtml(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Render de formato WhatsApp básico:
// *bold*  _italic_  ~strike~  `mono`  ```block```  links http(s)
function renderWhatsApp(text: string) {
    let html = escapeHtml(text);

    // bloques de código ```...```
    html = html.replace(/```([\s\S]*?)```/g, (_m, p1) => {
        return `<pre style="margin:8px 0;padding:8px;border-radius:6px;background:#f5f5f5;white-space:pre-wrap">${escapeHtml(
            p1
        )}</pre>`;
    });

    // inline code `...`
    html = html.replace(/`([^`]+?)`/g, (_m, p1) => {
        return `<code style="font-family:ui-monospace,monospace;background:#f5f5f5;padding:0 4px;border-radius:4px">${escapeHtml(
            p1
        )}</code>`;
    });

    // negrita *...*
    html = html.replace(/\*(?!\s)([^*]+?)(?<!\s)\*/g, "<strong>$1</strong>");
    // cursiva _..._
    html = html.replace(/_(?!\s)([^_]+?)(?<!\s)_/g, "<em>$1</em>");
    // tachado ~...~
    html = html.replace(/~(?!\s)([^~]+?)(?<!\s)~/g, "<s>$1</s>");

    // links
    html = html.replace(
        /\bhttps?:\/\/[^\s]+/g,
        (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );

    // saltos de línea
    html = html.replace(/\n/g, "<br/>");

    return html;
}

export default function WhatsappMessageEditor({
    initialText = "",
    placeholders = [],
    maxLength = 4096,
    onChangeText,
    onChange,
    onSendTest,
    esActualizar = false,
    updateMensaje = () => { }
}: Props) {
    const [text, setText] = useState(initialText);
    const [phone, setPhone] = useState("");
    const [placeholderAnchor, setPlaceholderAnchor] = useState<HTMLElement | null>(null);
    const [emojiAnchor, setEmojiAnchor] = useState<HTMLElement | null>(null);
    const taRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => setText(initialText), [initialText]);

    const used = text.length;
    const remaining = maxLength - used;
    const previewHtml = useMemo(() => renderWhatsApp(text), [text]);

    const applyWrap = (left: string, right?: string) => {
        const el = taRef.current;
        if (!el) return;
        const { selectionStart, selectionEnd, value } = el;
        const sel = value.substring(selectionStart || 0, selectionEnd || 0);
        const r = right ?? left;
        const snippet = `${left}${sel}${r}`;
        const { next, cursor } = insertAtCursor(el, snippet);
        setText(next);
        onChangeText?.(next);
        // recolocar cursor
        setTimeout(() => {
            el.focus();
            el.setSelectionRange(cursor - r.length, cursor - r.length + sel.length);
        });
    };

    const addNewLine = () => {
        const el = taRef.current;
        if (!el) return;
        const { next, cursor } = insertAtCursor(el, "\n");
        setText(next);
        onChangeText?.(next);
        setTimeout(() => {
            el.focus();
            el.setSelectionRange(cursor, cursor);
        });
    };

    const insertText = (snippet: string) => {
        const el = taRef.current;
        if (!el) return;
        const { next, cursor } = insertAtCursor(el, snippet);
        setText(next);
        onChangeText?.(next);
        setTimeout(() => {
            el.focus();
            el.setSelectionRange(cursor, cursor);
        });
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(text);
    };

    const sendTest = async () => {
        if (!onSendTest) return;
        await onSendTest(phone, text);
    };

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Mensaje de WhatsApp
                </Typography>

                {/* Toolbar básica */}
                <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
                    <ButtonGroup size="small" variant="outlined">
                        <Button onClick={() => applyWrap("*")}>*Negrita*</Button>
                        <Button onClick={() => applyWrap("_")}>_Cursiva_</Button>
                        <Button onClick={() => applyWrap("~")}>~Tachado~</Button>
                        <Button onClick={() => applyWrap("`")}>`Mono`</Button>
                    </ButtonGroup>

                    <ButtonGroup size="small" variant="outlined">
                        <Button onClick={addNewLine}>Salto de línea</Button>
                        <Button onClick={() => applyWrap("```", "```")}>Bloque de código</Button>
                    </ButtonGroup>

                    {/* Placeholders */}
                    {/* <Button
                        size="small"
                        variant="outlined"
                        endIcon={<ArrowDropDownIcon />}
                        disabled={!placeholders.length}
                        onClick={(e) => setPlaceholderAnchor(e.currentTarget)}
                    >
                        Variables
                    </Button> */}
                    <Popover
                        open={Boolean(placeholderAnchor)}
                        anchorEl={placeholderAnchor}
                        onClose={() => setPlaceholderAnchor(null)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                        {/* <Box sx={{ p: 1, minWidth: 200 }}>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                Inserta {{}} en el cursor
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Stack spacing={0.5}>
                                {placeholders.map((p) => (
                                    <Button
                                        key={p}
                                        size="small"
                                        onClick={() => {
                                            insertText(`{{${p}}}`);
                                            setPlaceholderAnchor(null);
                                        }}
                                    >
                                        {{}} {p}
                                    </Button>
                                ))}
                            </Stack>
                        </Box> */}
                    </Popover>

                    {/* Emojis */}
                    <Tooltip title="Insertar emoji">
                        <IconButton size="small" onClick={(e) => setEmojiAnchor(e.currentTarget)}>
                            <EmojiEmotionsIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        open={Boolean(emojiAnchor)}
                        anchorEl={emojiAnchor}
                        onClose={() => setEmojiAnchor(null)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                        <Box sx={{ p: 1, maxWidth: 260 }}>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {COMMON_EMOJIS.map((e) => (
                                    <Button
                                        key={e}
                                        size="small"
                                        onClick={() => {
                                            insertText(e);
                                            setEmojiAnchor(null);
                                        }}
                                    >
                                        {e}
                                    </Button>
                                ))}
                            </Stack>
                        </Box>
                    </Popover>

                    <Tooltip title="Copiar mensaje">
                        <IconButton size="small" onClick={copyToClipboard}>
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <TextField
                    inputRef={taRef}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        onChangeText?.(e.target.value);
                        onChange?.(e.target.value);
                    }}
                    multiline
                    minRows={14}
                    fullWidth
                    placeholder="Escribe tu mensaje de WhatsApp aquí..."
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Typography
                                    variant="caption"
                                    sx={{
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        bgcolor: remaining >= 0 ? "success.softBg" : "error.softBg",
                                        color: remaining >= 0 ? "success.main" : "error.main",
                                    }}
                                >
                                    {used}/{maxLength}
                                </Typography>
                            </InputAdornment>
                        ),
                        sx: {
                            fontFamily:
                                "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji','Segoe UI Emoji'",
                            lineHeight: 1.6,
                        },
                    }}
                />


                {/* Envío de prueba opcional */}
                {onSendTest && (
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 1 }}>
                        <TextField
                            label="Teléfono de prueba"
                            size="small"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+593 9XXXXXXXX"
                            sx={{ maxWidth: 280 }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            onClick={sendTest}
                            disabled={!phone || used === 0 || used > maxLength}
                        >
                            Enviar prueba
                        </Button>
                    </Stack>
                )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Previsualización
                </Typography>

                <Box
                    sx={{
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        p: 2,
                        minHeight: 300,
                        bgcolor: "background.paper",
                        fontSize: 16,
                        lineHeight: 1.6,
                        wordBreak: "break-word",
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: previewHtml }}
                        style={{ whiteSpace: "normal" }}
                    />
                </Box>

                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                    Formatos: *negrita*, _cursiva_, ~tachado~, `mono`, ```bloque```, enlaces.
                </Typography>
            </Grid>
            <Grid size={{ lg: 12 }}>
                {
                    esActualizar && (
                        <Button variant="contained" fullWidth onClick={updateMensaje}> Actualizar</Button>
                    )
                }
            </Grid>
        </Grid>
    );
}
