// utils/EnvioMensajeWhatsapp.ts (o donde lo tienes)
import { SessionRow } from "@/Pages/WhatsappConfiguracion/models/types";
import { enviarMensajeWhatsapp } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
import { apiList, apiStatus } from "@/Pages/WhatsappConfiguracion/services/whatsappDb";

type FailReport = { telefono: string; nombre?: string; motivo?: string };

function normalizePhone(raw: string) {
    return (raw || "").replace(/[^\d+]/g, "").replace(/^00/, "+").trim();
}

const AFFINITY_KEY = "wa_session_affinity_v1";
type AffinityMap = Record<string, string>;
const loadAffinity = (): AffinityMap => {
    try { return JSON.parse(localStorage.getItem(AFFINITY_KEY) || "{}"); } catch { return {}; }
};
const saveAffinity = (m: AffinityMap) => localStorage.setItem(AFFINITY_KEY, JSON.stringify(m));
const getPreferredUserFor = (p: string) => loadAffinity()[normalizePhone(p)];
const setPreferredUserFor = (p: string, u: string) => { const m = loadAffinity(); m[normalizePhone(p)] = u; saveAffinity(m); };
const clearPreferredUserFor = (p: string) => { const m = loadAffinity(); const k = normalizePhone(p); if (k in m) { delete m[k]; saveAffinity(m); } };

/**
 * Envía un mensaje intentando 1 vez (ajustable) y reporta fallos vía onFail.
 */
export const EnviarMensajeWhatasappRamdon = async (
    telefono: string,
    mensaje: string,
    opts?: { onFail?: (f: FailReport) => void; nombre?: string }
) => {
    const report = (motivo: string) => opts?.onFail?.({ telefono, nombre: opts?.nombre, motivo });

    try {
        const db = await apiList();
        const wsHabilitados: SessionRow[] = db.filter(x => x.ready);
        if (!wsHabilitados.length) {
            report("No hay sesiones de WhatsApp listas (ready).");
            throw new Error("No hay sesiones de WhatsApp listas (ready).");
        }

        const preferredUser = getPreferredUserFor(telefono);
        const preferredSession = preferredUser
            ? wsHabilitados.find(s => s.user === preferredUser && s.ready)
            : undefined;

        const others = wsHabilitados
            .filter(s => !preferredSession || s.user !== preferredSession.user)
            .sort(() => Math.random() - 0.5);

        const intentOrder: SessionRow[] = preferredSession ? [preferredSession, ...others] : others;

        const MAX_INTENTOS = 1; // puedes subirlo a 2-3 si deseas
        let intentos = 0;
        let ultimoError: unknown = null;
        const yaProbadas = new Set<string>();

        while (intentos < MAX_INTENTOS) {
            let sesion = intentOrder.find(s => !yaProbadas.has(s.user));
            if (!sesion) {
                const reshuffled = others.sort(() => Math.random() - 0.5);
                sesion = reshuffled.find(s => !yaProbadas.has(s.user)) ?? reshuffled[0];
            }
            yaProbadas.add(sesion.user);

            try {
                // ⇣⇣⇣ AQUÍ inspeccionamos la respuesta del servicio web ⇣⇣⇣
                const st = await apiStatus(sesion.user);
                if (st.ready) {
                    const resp = await enviarMensajeWhatsapp(sesion.user, telefono, mensaje);
                    if (resp && (resp.ok === false || resp.status === "error")) {
                        const motivo = resp.message || resp.error || "Servicio respondió error";
                        if (preferredSession && sesion.user === preferredSession.user) clearPreferredUserFor(telefono);
                        report(motivo);
                        throw new Error(motivo);
                    }
                    // En lugar de 250ms base, usar rangos más naturales
                    const baseTimes = [800, 1200, 1500, 2000]; // ms más humanos
                    const baseTime = baseTimes[Math.floor(Math.random() * baseTimes.length)];
                    const waitMs = baseTime * Math.pow(1.8, intentos - 1) + Math.random() * 600;
                    await new Promise(res => setTimeout(res, waitMs));
                } else {
                    const motivo = "Error el usuario ya no esta ready: " + sesion.user;
                    report(motivo);
                    throw new Error(motivo);
                }
                if (preferredUser !== sesion.user) setPreferredUserFor(telefono, sesion.user);
                return; // éxito
            } catch (err: any) {
                ultimoError = err;
                intentos++;

                // Limpia afinidad si falló la preferida
                if (preferredSession && sesion.user === preferredSession.user) clearPreferredUserFor(telefono);

                // Extrae mensaje de error (axios/fetch)
                const motivo =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    err?.message ||
                    "Error no especificado";
                report(motivo);

                // backoff ligero (opcional)
                const waitMs = 250 * Math.pow(2, intentos - 1) + Math.floor(Math.random() * 150);
                await new Promise(res => setTimeout(res, waitMs));

                // si aún hay intentos disponibles sigue el loop; si no, saldrá abajo
            }
        }

        // si agotó intentos, falla
        throw ultimoError instanceof Error ? ultimoError : new Error("Fallo de envío desconocido");
    } catch (outerErr) {
        // re-lanza para que el caller (tu bucle masivo) lo cuente como fallido si quiere
        throw outerErr;
    }
};


