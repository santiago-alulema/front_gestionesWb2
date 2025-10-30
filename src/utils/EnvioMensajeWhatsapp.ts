import { SessionRow } from "@/Pages/WhatsappConfiguracion/models/types";
import { enviarMensajeWhatsapp } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
import { apiList } from "@/Pages/WhatsappConfiguracion/services/whatsappDb";
import { showAlert } from "@/utils/modalAlerts";

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

        // Barajar sesiones para elegir al azar sin repetir
        const shuffled = [...wsHabilitados].sort(() => Math.random() - 0.5);

        const MAX_INTENTOS = 3;
        let intentos = 0;
        let enviado = false;
        let ultimoError: unknown = null;

        // Intentar hasta 3 veces; si hay menos de 3 sesiones, se vuelve a “barajar” cuando haga falta
        while (intentos < MAX_INTENTOS && !enviado) {
            const idx = intentos % shuffled.length; // reusa si hay menos de 3
            const sesion = shuffled[idx];

            try {
                // IMPORTANTE: usar el usuario de la sesión elegida
                await enviarMensajeWhatsapp(sesion.user, telefono, mensaje);

                enviado = true;
                showAlert({
                    title: "Correcto",
                    message: `Mensaje fue enviado a ${telefono} <strong>CORRECTAMENTE</strong>.`,
                    type: "success",
                    callBackFunction: false
                });
                return; // éxito, salimos
            } catch (err) {
                ultimoError = err;
                intentos++;

                // Pequeña espera exponencial con jitter (opcional)
                const waitMs = 250 * Math.pow(2, intentos - 1) + Math.floor(Math.random() * 150);
                await new Promise(res => setTimeout(res, waitMs));
            }
        }

        // Si llegó aquí, fracasó en los 3 intentos
        showAlert({
            title: "No se pudo enviar",
            message: `Falló el envío tras ${MAX_INTENTOS} intentos.`,
            type: "error",
            callBackFunction: false
        });
        console.error("Error al enviar WhatsApp (último):", ultimoError);
    } catch (outerErr) {
        showAlert({
            title: "Error",
            message: "Ocurrió un error al preparar el envío.",
            type: "error",
            callBackFunction: false
        });
        console.error("Error preparando sesiones:", outerErr);
    }
};