// import { SessionRow } from "@/Pages/WhatsappConfiguracion/models/types";
// import { enviarMensajeWhatsapp } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
// import { apiList } from "@/Pages/WhatsappConfiguracion/services/whatsappDb";
// import { showAlert } from "@/utils/modalAlerts";

// export const EnviarMensajeWhatasappRamdon = async (telefono: string, mensaje: string) => {
//     try {
//         const db = await apiList();
//         const wsHabilitados: SessionRow[] = db.filter(x => x.ready);

//         if (!wsHabilitados.length) {
//             showAlert({
//                 title: "Sin sesiones",
//                 message: "No hay sesiones de WhatsApp listas (ready) para enviar el mensaje.",
//                 type: "error",
//                 callBackFunction: false
//             });
//             return;
//         }

//         // Barajar sesiones para elegir al azar sin repetir
//         const shuffled = [...wsHabilitados].sort(() => Math.random() - 0.5);

//         const MAX_INTENTOS = 3;
//         let intentos = 0;
//         let enviado = false;
//         let ultimoError: unknown = null;

//         // Intentar hasta 3 veces; si hay menos de 3 sesiones, se vuelve a “barajar” cuando haga falta
//         while (intentos < MAX_INTENTOS && !enviado) {
//             const idx = intentos % shuffled.length; // reusa si hay menos de 3
//             const sesion = shuffled[idx];

//             try {
//                 // IMPORTANTE: usar el usuario de la sesión elegida
//                 await enviarMensajeWhatsapp(sesion.user, telefono, mensaje);

//                 enviado = true;
//                 showAlert({
//                     title: "Correcto",
//                     message: `Mensaje fue enviado a ${telefono} <strong>CORRECTAMENTE</strong>.`,
//                     type: "success",
//                     callBackFunction: false
//                 });
//                 return; // éxito, salimos
//             } catch (err) {
//                 ultimoError = err;
//                 intentos++;

//                 // Pequeña espera exponencial con jitter (opcional)
//                 const waitMs = 250 * Math.pow(2, intentos - 1) + Math.floor(Math.random() * 150);
//                 await new Promise(res => setTimeout(res, waitMs));
//             }
//         }

//         // Si llegó aquí, fracasó en los 3 intentos
//         showAlert({
//             title: "No se pudo enviar",
//             message: `Falló el envío tras ${MAX_INTENTOS} intentos.`,
//             type: "error",
//             callBackFunction: false
//         });
//         console.error("Error al enviar WhatsApp (último):", ultimoError);
//     } catch (outerErr) {
//         showAlert({
//             title: "Error",
//             message: "Ocurrió un error al preparar el envío.",
//             type: "error",
//             callBackFunction: false
//         });
//         console.error("Error preparando sesiones:", outerErr);
//     }
// };







// import { SessionRow } from "@/Pages/WhatsappConfiguracion/models/types";
// import { enviarMensajeWhatsapp } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
// import { apiList } from "@/Pages/WhatsappConfiguracion/services/whatsappDb";
// import { showAlert } from "@/utils/modalAlerts";

// /** ---------- Normalización ---------- **/
// function normalizePhone(raw: string) {
//     return (raw || "").replace(/[^\d+]/g, "").replace(/^00/, "+").trim();
// }

// /** ---------- Afinidad (igual que tu versión) ---------- **/
// const AFFINITY_KEY = "wa_session_affinity_v1";
// type AffinityMap = Record<string, string>;
// function loadAffinity(): AffinityMap {
//     try { return JSON.parse(localStorage.getItem(AFFINITY_KEY) || "{}"); } catch { return {}; }
// }
// function saveAffinity(map: AffinityMap) {
//     localStorage.setItem(AFFINITY_KEY, JSON.stringify(map));
// }
// function getPreferredUserFor(phone: string) {
//     const map = loadAffinity(); return map[normalizePhone(phone)];
// }
// function setPreferredUserFor(phone: string, user: string) {
//     const map = loadAffinity(); map[normalizePhone(phone)] = user; saveAffinity(map);
// }
// function clearPreferredUserFor(phone: string) {
//     const map = loadAffinity(); const k = normalizePhone(phone);
//     if (k in map) { delete map[k]; saveAffinity(map); }
// }

// /** ---------- Lista “no contactar” (DNC) básica ---------- **/
// const DNC_KEY = "wa_dnc_v1";
// function loadDnc(): Set<string> {
//     try { return new Set<string>(JSON.parse(localStorage.getItem(DNC_KEY) || "[]")); } catch { return new Set(); }
// }
// function isInDnc(phone: string) {
//     return loadDnc().has(normalizePhone(phone));
// }

// /** ---------- Rate limiting por sesión y cooldown por destinatario ---------- **/
// class RateLimiter {
//     // Último envío por sesión
//     private lastSentBySession = new Map<string, number>();
//     // Espacio mínimo entre envíos por sesión (ajusta según tus límites de negocio)
//     private readonly minGapMs: number;
//     constructor(minGapMs = 1200) { // ~50 msg/min/sesión como máximo
//         this.minGapMs = minGapMs;
//     }
//     async wait(sessionUser: string) {
//         const now = Date.now();
//         const last = this.lastSentBySession.get(sessionUser) ?? 0;
//         const gap = this.minGapMs - (now - last);
//         const jitter = Math.floor(Math.random() * 150); // pequeño jitter “sano”
//         const waitFor = Math.max(0, gap) + jitter;
//         if (waitFor > 0) {
//             await new Promise(res => setTimeout(res, waitFor));
//         }
//         this.lastSentBySession.set(sessionUser, Date.now());
//     }
// }
// const rateLimiter = new RateLimiter(1200); // ajustable

// // Cooldown por destinatario para no tocar al mismo número repetidamente
// const RECIPIENT_COOLDOWN_MS = 5 * 60 * 1000; // 5 min
// const lastTouchByRecipient = new Map<string, number>();
// function canMessageRecipient(phone: string) {
//     const k = normalizePhone(phone);
//     const last = lastTouchByRecipient.get(k) ?? 0;
//     return Date.now() - last >= RECIPIENT_COOLDOWN_MS;
// }
// function markRecipientTouched(phone: string) {
//     lastTouchByRecipient.set(normalizePhone(phone), Date.now());
// }

// /** ---------- Envío con afinidad, límites y respeto al usuario ---------- **/
// export const EnviarMensajeWhatasappRamdon = async (telefono: string, mensaje: string) => {
//     try {
//         const phone = normalizePhone(telefono);

//         // Respetar opt-out / DNC
//         if (isInDnc(phone)) {
//             showAlert({
//                 title: "No se envió",
//                 message: `El número ${phone} está en la lista de no contactar.`,
//                 type: "warning",
//                 callBackFunction: false
//             });
//             return;
//         }

//         // Cooldown por destinatario
//         if (!canMessageRecipient(phone)) {
//             showAlert({
//                 title: "Envío retenido",
//                 message: `Se evitó contactar nuevamente a ${phone} tan pronto. Intenta más tarde.`,
//                 type: "info",
//                 callBackFunction: false
//             });
//             return;
//         }

//         const db = await apiList();
//         const wsHabilitados: SessionRow[] = db.filter(x => x.ready);

//         if (!wsHabilitados.length) {
//             showAlert({
//                 title: "Sin sesiones",
//                 message: "No hay sesiones de WhatsApp listas (ready) para enviar el mensaje.",
//                 type: "error",
//                 callBackFunction: false
//             });
//             return;
//         }

//         // Afinidad primero
//         const preferredUser = getPreferredUserFor(phone);
//         const preferredSession = preferredUser
//             ? wsHabilitados.find(s => s.user === preferredUser && s.ready)
//             : undefined;

//         const others = wsHabilitados
//             .filter(s => !preferredSession || s.user !== preferredSession.user)
//             .sort(() => Math.random() - 0.5);

//         const intentOrder: SessionRow[] = preferredSession
//             ? [preferredSession, ...others]
//             : others;

//         const MAX_INTENTOS = 3;
//         let intentos = 0;
//         let enviado = false;
//         let ultimoError: unknown = null;
//         const yaProbadas = new Set<string>();

//         while (intentos < MAX_INTENTOS && !enviado) {
//             let sesion = intentOrder.find(s => !yaProbadas.has(s.user));
//             if (!sesion) {
//                 const reshuffled = others.sort(() => Math.random() - 0.5);
//                 sesion = reshuffled.find(s => !yaProbadas.has(s.user)) ?? reshuffled[0];
//             }
//             yaProbadas.add(sesion.user);

//             try {
//                 // Rate limit por sesión (no es “simulación humana”, es control de throughput)
//                 await rateLimiter.wait(sesion.user);

//                 await enviarMensajeWhatsapp(sesion.user, phone, mensaje);

//                 // Afinidad y cooldown
//                 if (preferredUser !== sesion.user) setPreferredUserFor(phone, sesion.user);
//                 markRecipientTouched(phone);

//                 enviado = true;
//                 showAlert({
//                     title: "Correcto",
//                     message: `Mensaje fue enviado a ${phone} <strong>CORRECTAMENTE</strong>.`,
//                     type: "success",
//                     callBackFunction: false
//                 });
//                 return;
//             } catch (err) {
//                 ultimoError = err;
//                 intentos++;

//                 // Si falló con la preferida, limpia afinidad
//                 if (preferredSession && sesion.user === preferredSession.user) {
//                     clearPreferredUserFor(phone);
//                 }

//                 // Backoff con jitter
//                 const waitMs = 250 * Math.pow(2, intentos - 1) + Math.floor(Math.random() * 150);
//                 await new Promise(res => setTimeout(res, waitMs));
//             }
//         }

//         showAlert({
//             title: "No se pudo enviar",
//             message: `Falló el envío tras ${MAX_INTENTOS} intentos.`,
//             type: "error",
//             callBackFunction: false
//         });
//         console.error("Error al enviar WhatsApp (último):", ultimoError);
//     } catch (outerErr) {
//         showAlert({
//             title: "Error",
//             message: "Ocurrió un error al preparar el envío.",
//             type: "error",
//             callBackFunction: false
//         });
//         console.error("Error preparando sesiones:", outerErr);
//     }
// };

















import { SessionRow } from "@/Pages/WhatsappConfiguracion/models/types";
import { enviarMensajeWhatsapp } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
import { apiList } from "@/Pages/WhatsappConfiguracion/services/whatsappDb";
import { showAlert } from "@/utils/modalAlerts";

/** ---------- Helpers de afinidad ---------- **/

const AFFINITY_KEY = "wa_session_affinity_v1";

/** Normaliza el teléfono para evitar duplicados por formato */
function normalizePhone(raw: string) {
    return (raw || "")
        .replace(/[^\d+]/g, "")     // deja dígitos y +
        .replace(/^00/, "+")        // 00XX -> +XX
        .trim();
}

type AffinityMap = Record<string, string>; // phone -> user (sesión)

/** Carga afinidad desde localStorage (o vacío si no hay) */
function loadAffinity(): AffinityMap {
    try {
        const json = localStorage.getItem(AFFINITY_KEY);
        return json ? (JSON.parse(json) as AffinityMap) : {};
    } catch {
        return {};
    }
}

/** Guarda afinidad (persistente) */
function saveAffinity(map: AffinityMap) {
    localStorage.setItem(AFFINITY_KEY, JSON.stringify(map));
}

/** Obtiene la sesión preferida para un teléfono */
function getPreferredUserFor(phone: string): string | undefined {
    const map = loadAffinity();
    return map[normalizePhone(phone)];
}

/** Registra/actualiza la sesión preferida para un teléfono */
function setPreferredUserFor(phone: string, user: string) {
    const map = loadAffinity();
    map[normalizePhone(phone)] = user;
    saveAffinity(map);
}

/** Elimina afinidad si ya no aplica (sesión no disponible, etc.) */
function clearPreferredUserFor(phone: string) {
    const map = loadAffinity();
    const key = normalizePhone(phone);
    if (key in map) {
        delete map[key];
        saveAffinity(map);
    }
}

/** ---------- Envío con afinidad de sesión ---------- **/

export const EnviarMensajeWhatasappRamdon = async (telefono: string, mensaje: string) => {
    try {
        const db = await apiList();
        const wsHabilitados: SessionRow[] = db.filter(x => x.ready);

        if (!wsHabilitados.length) {
            showAlert({
                title: "Sin sesiones",
                message: "No hay sesiones de WhatsApp listas (ready) para enviar el mensaje.",
                type: "error",
                callBackFunction: false
            });
            return;
        }

        // 1) Si hay sesión preferida para este teléfono y está lista, probarla primero
        const preferredUser = getPreferredUserFor(telefono);
        const preferredSession = preferredUser
            ? wsHabilitados.find(s => s.user === preferredUser && s.ready)
            : undefined;

        // 2) Construir orden de intento: preferida (si existe) + el resto barajado
        const others = wsHabilitados
            .filter(s => !preferredSession || s.user !== preferredSession.user)
            .sort(() => Math.random() - 0.5);

        const intentOrder: SessionRow[] = preferredSession
            ? [preferredSession, ...others]
            : others;

        // Hasta 3 intentos como máximo
        const MAX_INTENTOS = 3;
        let intentos = 0;
        let enviado = false;
        let ultimoError: unknown = null;

        // Evita repetir la misma sesión en intentos sucesivos
        const yaProbadas = new Set<string>();

        while (intentos < MAX_INTENTOS && !enviado) {
            // elegir la siguiente sesión aún no probada; si se acaban, rebarajar las "others"
            let sesion = intentOrder.find(s => !yaProbadas.has(s.user));

            if (!sesion) {
                // si ya probamos todas, rebarajar "others" y seguir
                const reshuffled = others.sort(() => Math.random() - 0.5);
                sesion = reshuffled.find(s => !yaProbadas.has(s.user)) ?? reshuffled[0];
            }

            yaProbadas.add(sesion.user);

            try {
                await enviarMensajeWhatsapp(sesion.user, telefono, mensaje);

                // Éxito: fijar afinidad (si cambió)
                if (preferredUser !== sesion.user) {
                    setPreferredUserFor(telefono, sesion.user);
                }

                enviado = true;
                // showAlert({
                //     title: "Correcto",
                //     message: `Mensaje fue enviado a ${telefono} <strong>CORRECTAMENTE</strong>.`,
                //     type: "success",
                //     callBackFunction: false
                // });
                return;
            } catch (err) {
                ultimoError = err;
                intentos++;

                // Si falló con la preferida, limpiar afinidad para no insistir con una sesión mala
                if (preferredSession && sesion.user === preferredSession.user) {
                    clearPreferredUserFor(telefono);
                }

                const waitMs = 250 * Math.pow(2, intentos - 1) + Math.floor(Math.random() * 150);
                await new Promise(res => setTimeout(res, waitMs));
            }
        }

        // showAlert({
        //     title: "No se pudo enviar",
        //     message: `Falló el envío tras ${MAX_INTENTOS} intentos.`,
        //     type: "error",
        //     callBackFunction: false
        // });
        console.error("Error al enviar WhatsApp (último):", ultimoError);
    } catch (outerErr) {
        // showAlert({
        //     title: "Error",
        //     message: "Ocurrió un error al preparar el envío.",
        //     type: "error",
        //     callBackFunction: false
        // });
        console.error("Error preparando sesiones:", outerErr);
    }
};
