// src/Pages/MensajesWhatsapp/Components/CrearActualizarMensajeWhatsappComponente.tsx
import CustomTextFieldFormTs from "@/components/DataGridCommon/CustomTextFieldFormTs";
import { Button, Grid, Typography } from "@mui/material";
import { useFormMensajesWhatsapp } from "../Hooks/useFormMensajesWhatsapp";
import { useMensajesWhatsapp } from "../Contexts/MensajesWhatsappContext";

const CrearActualizarMensajeWhatsappComponente = () => {
    const { control, errors, rules, onSubmit } = useFormMensajesWhatsapp();
    const { esEditar, setAbrirModal } = useMensajesWhatsapp();

    return (
        <Grid container spacing={3}>
            <Grid size={{ lg: 12 }}>
                <Typography variant="h6" fontWeight="bold">
                    {esEditar ? "Editar" : "Crear Nuevo"} Mensaje
                </Typography>
            </Grid>

            <Grid size={{ lg: 12 }}>
                <CustomTextFieldFormTs
                    name="mensaje"
                    control={control}
                    errors={errors}
                    requiredField
                    labelFullField="Mensaje (WhatsApp)"
                    label="Escriba el mensaje de WhatsApp"
                    rules={rules.mensaje}
                    multiline
                    rows={15}
                />
            </Grid>



            {/* <Grid size={{ lg: 6 }}>
                <CustomTextFieldFormTs
                    name="mensajeCorreo"
                    control={control}
                    errors={errors}
                    labelFullField="Mensaje para Correo (opcional)"
                    label="Escriba el mensaje de correo (opcional)"
                    multiline
                    rows={2}
                />
            </Grid> */}

            <Grid size={{ lg: 12 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={onSubmit} sx={{ borderRadius: 5 }}>
                    Aceptar
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setAbrirModal(false)}
                    sx={{ borderRadius: 5, ml: 1 }}
                    color="inherit"
                >
                    Cancelar
                </Button>
            </Grid>
        </Grid>
    );
};

export default CrearActualizarMensajeWhatsappComponente;
