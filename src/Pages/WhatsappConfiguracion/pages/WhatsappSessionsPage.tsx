import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Chip, IconButton, Stack, TextField, Typography } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import CachedIcon from "@mui/icons-material/Cached";
import LogoutIcon from "@mui/icons-material/Logout";
import { apiEnsure, apiList, apiLogout, apiSend, apiStatus } from "@/Pages/WhatsappConfiguracion/services/whatsappDb";
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { showAlert } from "@/utils/modalAlerts";
import { enviarMensajeWhatsapp } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
type Row = {
    user: string;
    ready: boolean;
    existsOnNode: boolean;
    lastReason?: string | null;
    updatedAt?: string;
};

export default function WhatsappSessionsPage() {
    const [user, setUser] = useState("");
    const [qr, setQr] = useState<string | null>(null);
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(false);

    async function loadTable() {
        const db = await apiList();
        setRows(db);
    }
    useEffect(() => { loadTable(); }, []);

    async function handleEnsure() {
        if (!user.trim()) return;
        setLoading(true); setQr(null);
        try {
            const ensure = await apiEnsure(user.trim()); // back → node
            if (ensure.qrDataUrl) setQr(ensure.qrDataUrl);
            await loadTable();
        } finally { setLoading(false); }
    }

    const enviarMensajePrueba = async (u: string) => {
        await enviarMensajeWhatsapp(u, "593986078545", "hola 👋 mundo, es un mensaje de test");
        const configAlert = {
            title: "Correcto",
            message: `Mensaje de prueba enviado a <strong>TEST</strong>.`,
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
    }

    async function handleRefresh() {
        if (!user.trim()) return;
        setLoading(true);
        try {
            const st = await apiStatus(user.trim());     // back → node
            if (!st.ready && st.hasQr) {
                const e2 = await apiEnsure(user.trim());   // renueva QR si aplica
                if (e2.qrDataUrl) setQr(e2.qrDataUrl);
            } else {
                setQr(null);
            }
            await loadTable();
        } finally { setLoading(false); }
    }

    async function handleLogout(u: string) {
        setLoading(true);
        try {
            await apiLogout(u);                          // back → node
            if (user.trim().toLowerCase() === u.toLowerCase()) setQr(null);
            await loadTable();
        } finally { setLoading(false); }
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h5" fontWeight={700}>Sesiones de WhatsApp</Typography>

            <Stack direction="row" spacing={1}>
                <TextField
                    label="Usuario / Alias de sesión"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    size="small"
                />
                <Button variant="contained" startIcon={<QrCode2Icon />} disabled={loading} onClick={handleEnsure}>
                    Obtener QR
                </Button>
                <Button variant="outlined" startIcon={<CachedIcon />} disabled={loading} onClick={handleRefresh}>
                    Cargar
                </Button>
            </Stack>

            {qr && (
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1">Escanea este QR en WhatsApp</Typography>
                        <Box mt={1}>
                            <img src={qr} alt="QR WhatsApp" style={{ width: 280, height: 280 }} />
                        </Box>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent>
                    <Typography variant="subtitle1" mb={1}>Sesiones registradas</Typography>
                    <Box sx={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: 8 }}>Usuario</th>
                                    <th style={{ textAlign: 'left', padding: 8 }}>Ready</th>
                                    <th style={{ textAlign: 'left', padding: 8 }}>Existe en Node</th>
                                    <th style={{ textAlign: 'left', padding: 8 }}>Última razón</th>
                                    <th style={{ textAlign: 'left', padding: 8 }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(r => (
                                    <tr key={r.user}>
                                        <td style={{ padding: 8 }}>{r.user}</td>
                                        <td style={{ padding: 8 }}>
                                            {r.ready ? <Chip color="primary" label="Sí" size="small" /> : <Chip label="No" size="small" />}
                                        </td>
                                        <td style={{ padding: 8 }}>
                                            {r.existsOnNode ? <Chip color="primary" label="Sí" size="small" /> : <Chip label="No" size="small" />}
                                        </td>
                                        <td style={{ padding: 8 }}>{r.lastReason ?? "-"}</td>
                                        <td style={{ padding: 8 }}>
                                            <IconButton onClick={() => handleLogout(r.user)} title="Logout">
                                                <LogoutIcon />
                                            </IconButton>
                                            <IconButton onClick={() => enviarMensajePrueba(r.user)} title="Enviar test">
                                                <SendToMobileIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                                {rows.length === 0 && (
                                    <tr><td colSpan={5} style={{ padding: 8, opacity: .7 }}>No hay sesiones guardadas aún.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    );
}
