import CustomModalTs from "@/components/CustomModalTs";
import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs"
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import CustomDatePicker from "@/components/DataGridCommon/CustomDatePicker";
import HtmlEmailEditorPreview from "@/components/HtmlEmailEditorPreview";
import ListaEmpresasComponents from "@/components/ListaEmpresasComponents"
import WhatsappMessageEditor from "@/components/WhatsappMessageEditor";
import { MensajeriaInDto } from "@/Pages/DeudoresGestionPage/models/MensajeriaInDto";
import { mensajesGestionesServicioWeb, mensajesTareasServicioWeb } from "@/Pages/DeudoresGestionPage/services/GestionDeudaServicios";
import { ConfiguracionColumnasMensajeriaMasica } from "@/Pages/MensajeriaMasiva/configs/ConfiguracionColumnasMensajeriaMasica";
import { obtenerDeudasMensajeriaServicioWeb } from "@/Pages/MensajeriaMasiva/services/MensajeriaMasvaServiciosWeb";
import {
    Button, Grid, TextField, Typography, Card, CardContent, CardHeader, Divider, Stack, Tooltip, Chip, Box, Alert,
    // NEW:
    Backdrop, CircularProgress, LinearProgress, List, ListItem, ListItemText, IconButton,
    FormControlLabel,
    Checkbox
} from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import { useLoading } from "@/components/LoadingContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PreviewIcon from '@mui/icons-material/Preview';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close'; // NEW
import BarraEnvioMensajes from "@/Pages/MensajeriaMasiva/components/BarraEnvioMensajes";
import dayjs from "dayjs";
import { EnviarCorreoOutDto } from "@/model/Dtos/Out/EnviarCorreoOutDto";
import { EnviarCorreoClienteServicioWeb } from "@/services/Service";
import { showAlert } from "@/utils/modalAlerts";
import { EnviarMensajeWhatasappRamdon } from "@/utils/EnvioMensajeWhatsapp";
import { normalizarTelefono } from "@/utils/MetodosAuxiliares";

const EnviarMensajeriaMasiva = () => {
    const [mensajesTarea, setMensajesTarea] = useState<MensajeriaInDto[]>([])
    const [seleccionarMensaje, setSeleccionarMensaje] = useState<MensajeriaInDto>(null);
    const [enviarA, setEnviarA] = useState<string>("");
    const [empresa, setEmpresa] = useState<string>("");
    const [filtro, setFiltro] = useState<string>("");
    const [plantilla, setPlantilla] = useState<string>("");
    const [checked, setChecked] = useState<boolean>(false);


    const [deudasClientes, setDeudasClientes] = useState<DebstByClientInfoInDTO[]>([]);
    const { startLoading, stopLoading } = useLoading();

    const [totalClientes, setTotalClientes] = useState<number>(0);
    const [numeroClienteSinTelefono, setNumeroClienteSinTelefono] = useState<number>(0);
    const [numeroClientesSinCorreo, setNumeroClientesSinCorreo] = useState<number>(0);

    const [abrirModal, setAbrirModal] = useState<boolean>(false);

    const opcionesFiltro = [
        { id: 'T', name: 'TODOS' },
        { id: 'G', name: 'GESTIONADOS' },
        { id: 'SG', name: 'SIN GESTIONAR' },
        { id: 'IN', name: 'INCUMPLIDOS' }
    ];

    const tipoMensaje = [
        { id: 'w', name: 'WHATSAPP' },
        { id: 'c', name: 'CORREO' }
    ];

    const cargarMensajesTareas = async () => {
        const respuesta = await mensajesTareasServicioWeb();
        const repuestaGestiones = await mensajesGestionesServicioWeb();
        setMensajesTarea([...respuesta, repuestaGestiones]);
    }

    useEffect(() => {
        cargarMensajesTareas();
    }, [])

    const obtenerDeudasCliente = async () => {
        try {
            startLoading();
            const repuesta = await obtenerDeudasMensajeriaServicioWeb(empresa, filtro)
            setNumeroClienteSinTelefono(repuesta.filter(x => x.telefono === "").length);
            setTotalClientes(repuesta.length)
            setNumeroClientesSinCorreo(repuesta.filter(x => x.correo === "").length)
            setDeudasClientes(repuesta)
        } finally {
            stopLoading();
        }
    }



    const enviarMensajesEmailMasivos = async () => {
        setIsSending(true);
        try {
            const correosValidos = deudasClientes.filter(x => x.correo !== "");
            const mensajesAEnviar = checked ? 5 : correosValidos.length; // misma lógica
            setProgress({ current: 0, total: mensajesAEnviar });        // NEW

            for (let index = 0; index < mensajesAEnviar; index++) {
                const element = correosValidos[index];
                await enviarCorreoCliente(element);
                setProgress(prev => ({ ...prev, current: prev.current + 1 }));
            }

            const configAlert = {
                title: "Correcto",
                message: `<strong>Se enviaron los correos correctamente </strong> `,
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
        } catch (error: any) {
            const configAlert = {
                title: "Error",
                message: `<strong>Error al enviar correos: ${error?.message ?? "desconocido"}</strong>`,
                type: 'error',
                callBackFunction: false
            };
            showAlert(configAlert);
        } finally {
            setIsSending(false);
        }
    };

    const [isSending, setIsSending] = useState(false);
    const [progress, setProgress] = useState<{ current: number, total: number }>({ current: 0, total: 0 });
    const [failedWhatsapps, setFailedWhatsapps] = useState<{ nombre: string; telefono: string; motivo?: string }[]>([]);
    const [openReporte, setOpenReporte] = useState(false);

    // const enviarMensajesWhatsappMasivos = async () => {
    //     try {
    //         setIsSending(true);
    //         setFailedWhatsapps([]);
    //         const whatsappValidos = deudasClientes.filter(x => x.telefono !== "");
    //         const mensajesAEnviar = checked ? 5 : whatsappValidos.length;
    //         setProgress({ current: 0, total: mensajesAEnviar });

    //         let mensajesEnviados = 0;

    //         for (let index = 0; index < mensajesAEnviar; index++) {
    //             const element = whatsappValidos[index];

    //             console.log(`Enviando mensaje ${index + 1} de ${mensajesAEnviar}...`);

    //             try {
    //                 await enviarMensajeWhatsappSW(element);
    //                 mensajesEnviados++;
    //             } catch (err: any) {
    //                 setFailedWhatsapps(prev => [
    //                     ...prev,
    //                     {
    //                         nombre: element?.nombre ?? "",
    //                         telefono: element?.telefono ?? "",
    //                         motivo: err?.message ?? "Error no especificado"
    //                     }
    //                 ]);
    //             }
    //             setProgress(prev => ({ ...prev, current: prev.current + 1 }));

    //             if (index < mensajesAEnviar - 1) {
    //                 const tiempoEspera = Math.floor(Math.random() * 12000) + 8000;
    //                 console.log(`Esperando ${(tiempoEspera / 1000).toFixed(1)} segundos...`);
    //                 await new Promise(resolve => setTimeout(resolve, tiempoEspera));
    //             }
    //         }

    //         const configAlert = {
    //             title: "Correcto",
    //             message: `<strong>Se enviaron ${mensajesEnviados} mensajes de WhatsApp correctamente</strong>${failedWhatsapps.length ? `<br/>Fallidos: ${failedWhatsapps.length}` : ""}`,
    //             type: failedWhatsapps.length ? 'warning' : 'success',
    //             callBackFunction: false
    //         };
    //         showAlert(configAlert);

    //         if (failedWhatsapps.length) setOpenReporte(true);

    //     } catch (error: any) {
    //         console.error('Error en el envío masivo:', error);
    //         const configAlert = {
    //             title: "Error",
    //             message: `<strong>Error al enviar mensajes: ${error.message}</strong>`,
    //             type: 'error',
    //             callBackFunction: false
    //         };
    //         showAlert(configAlert);
    //     } finally {
    //         // NEW: terminar pantalla de carga SOLO cuando acabó todo
    //         setIsSending(false);
    //     }
    // };

    const enviarMensajesWhatsappMasivos = async () => {
        try {
            setIsSending(true);

            const failedLocal: { nombre: string; telefono: string; motivo?: string }[] = [];
            const whatsappValidos = deudasClientes.filter(x => x.telefono !== "");
            const mensajesAEnviar = checked ? 5 : whatsappValidos.length;
            setProgress({ current: 0, total: mensajesAEnviar });

            let mensajesEnviados = 0;

            for (let index = 0; index < mensajesAEnviar; index++) {
                const element = whatsappValidos[index];
                console.log(`Enviando mensaje ${index + 1} de ${mensajesAEnviar}...`);

                try {
                    await enviarMensajeWhatsappSW(element);
                    mensajesEnviados++;
                } catch (err: any) {
                    failedLocal.push({
                        nombre: element?.nombre ?? "",
                        telefono: element?.telefono ?? "",
                        motivo: err?.message ?? "Error no especificado",
                    });
                }

                setProgress(prev => ({ ...prev, current: prev.current + 1 }));

                if (index < mensajesAEnviar - 1) {
                    const tiempoEspera = Math.floor(Math.random() * 12000) + 8000;
                    console.log(`Esperando ${(tiempoEspera / 1000).toFixed(1)} segundos...`);
                    await new Promise(resolve => setTimeout(resolve, tiempoEspera));
                }
            }

            setFailedWhatsapps(failedLocal);
            const huboFallos = failedLocal.length > 0;

            const configAlert = {
                title: huboFallos ? "Parcialmente correcto" : "Correcto",
                message: `<strong>Se enviaron ${mensajesEnviados} mensajes de WhatsApp correctamente</strong>${huboFallos ? `<br/>Fallidos: ${failedLocal.length}` : ""
                    }`,
                type: huboFallos ? "warning" : "success",
                callBackFunction: false,
            };
            showAlert(configAlert);

            if (huboFallos) {
                // 🔥 DESCARGAR ARCHIVO TXT CON LOS NÚMEROS FALLIDOS
                const contenido = failedLocal
                    .map(
                        f =>
                            `Nombre: ${f.nombre || "Sin nombre"} | Teléfono: ${f.telefono || "Sin teléfono"
                            } | Motivo: ${f.motivo || "Error no especificado"}`
                    )
                    .join("\n");

                const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = `Reporte_Fallos_Whatsapp_${dayjs().format("YYYYMMDD_HHmmss")}.txt`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                setOpenReporte(true); // abre también el modal
            }
        } catch (error: any) {
            console.error("Error en el envío masivo:", error);
            const configAlert = {
                title: "Error",
                message: `<strong>Error al enviar mensajes: ${error.message}</strong>`,
                type: "error",
                callBackFunction: false,
            };
            showAlert(configAlert);
        } finally {
            setIsSending(false);
        }
    };


    const envioEsWhatsapp = enviarA === "w";
    const envioEsCorreo = enviarA === "c";
    const puedeObtenerClientes = Boolean(empresa) && Boolean(filtro);
    const puedePrevisualizar = (envioEsWhatsapp || envioEsCorreo) && Boolean(seleccionarMensaje);
    const puedeEnviar = deudasClientes.length > 0 && (envioEsWhatsapp || envioEsCorreo) && Boolean(seleccionarMensaje);

    const enviarCorreoCliente = async (deudorSeleccionado: DebstByClientInfoInDTO) => {
        try {
            startLoading();
            dayjs.locale("es");
            const mensajeEnviarPlantilla = plantilla
                ? plantilla
                : seleccionarMensaje.mensajeCorreo;
            const mensajeEnviar = mensajeEnviarPlantilla
                .replace("{{cedula}}", ` - ${deudorSeleccionado.idDeudor}`)
                .replace("{{nombre}}", `${deudorSeleccionado.nombre}`)
                .replace("{{cliente}}", `${deudorSeleccionado.nombre}`)
                .replaceAll("{{contrato}}", ` ${deudorSeleccionado.numeroFactura} `)
                .replaceAll("{{valorDeuda}}", ` ${deudorSeleccionado.saldoDeuda} `)
                .replaceAll("{{empresa}}", ` ${deudorSeleccionado.empresa}* `)
                .replace("{{valorPago}}", `${deudorSeleccionado.valorCuota}`)
                .replace("{{telefonoGestor}}", `${deudorSeleccionado.telefono}`);;

            const htmlBody: EnviarCorreoOutDto = {
                htmlBody: mensajeEnviar,
                subject: "Gestion de cobranza",
                to: checked ? "santiagoalulema@gmail.com" : deudorSeleccionado.correo
            }
            await EnviarCorreoClienteServicioWeb(htmlBody);
        } catch (error) {
        } finally {
            stopLoading();
        }
    }

    const enviarMensajeWhatsappSW = async (deudaSeleccionada: DebstByClientInfoInDTO) => {
        try {
            const telefonoNormalizado = normalizarTelefono(checked ? "092286078545" : deudaSeleccionada.telefono);
            dayjs.locale("es"); // establecer idioma global
            const fechaPago = dayjs(deudaSeleccionada.fechaUltimoPago)
                .add(1, "month")
                .format("D [de] MMMM [del] YYYY");
            const fechaActual = dayjs().format("D [de] MMMM [del] YYYY");
            const productoFormateado = deudaSeleccionada.productoDescripcion.replaceAll("||", "\n-")
                .replaceAll("<strong>", "*")
                .replaceAll("</strong>", "*");

            const mensajeEnviarPlantilla = plantilla
                ? plantilla
                : seleccionarMensaje.mensaje;
            const mensajeEnviar = mensajeEnviarPlantilla
                .replace("{{cedula}}", `*${deudaSeleccionada.idDeudor}*`)
                .replace("{{nombre}}", `*${deudaSeleccionada.nombre}*`)
                .replace("{{producto}}", `*${productoFormateado}*`)
                .replace("{{telefono}}", `*${deudaSeleccionada.telefono}*`)
                .replace("{{fecha}}", `*${fechaActual}*`)
                .replace("{{empresa}}", `*${deudaSeleccionada.empresa}*`)
                .replace("{{deuda}}", `*${deudaSeleccionada.saldoDeuda}*`)
                .replace("{{fechaPago}}", `*${fechaPago}*`)
                .replace("{{pagoUnico}}", `*${deudaSeleccionada.montoCobrar}*`)

            // NOTA: Mantengo tu start/stopLoading interno (no toco lógica).
            // La pantalla de carga global "isSending" seguirá activa hasta terminar todos.
            startLoading();
            await EnviarMensajeWhatasappRamdon(telefonoNormalizado, mensajeEnviar);
            stopLoading();

        } catch (error) {
            // Dejar que el error se maneje donde se llama (arriba capturamos y registramos)
            throw error;
        } finally {
        }
    }

    // Porcentaje para LinearProgress (seguro cuando total > 0)
    const percent = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

    return (
        <>
            {/* NEW: Barra fija y Backdrop durante envío */}
            {isSending && (
                <>
                    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1301 }}>
                        <LinearProgress variant="determinate" value={percent} />
                    </Box>
                    <Backdrop open sx={{ color: '#fff', zIndex: 1300, flexDirection: 'column', gap: 2 }}>
                        <CircularProgress />
                        {/* Si tu BarraEnvioMensajes acepta props { total, actual } */}
                        <BarraEnvioMensajes total={progress.total} actual={progress.current} />
                        <Typography variant="body2">Enviando mensajes... {progress.current}/{progress.total}</Typography>
                    </Backdrop>
                </>
            )}

            <Grid container spacing={2}>
                <Grid size={{ lg: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                        Selecciona empresa, filtro y plantilla. Luego visualiza el resumen y envía tus mensajes por WhatsApp o correo.
                    </Typography>
                </Grid>

                <Grid size={{ lg: 12 }}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardHeader
                            title="Resumen"
                            subheader="Conteo dinámico en base a la última búsqueda"
                        />
                        <CardContent>
                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" mb={2} ml={2}>
                                <Chip
                                    icon={<PeopleAltIcon />}
                                    label={`Total clientes: ${totalClientes}`}
                                    color="default"
                                    variant="outlined"
                                />
                                <Chip
                                    icon={<PhoneDisabledIcon />}
                                    label={`Sin teléfono: ${numeroClienteSinTelefono}`}
                                    color="warning"
                                    variant="outlined"
                                />
                                <Chip
                                    icon={<MailOutlineIcon />}
                                    label={`Sin correo: ${numeroClientesSinCorreo}`}
                                    color="warning"
                                    variant="outlined"
                                />
                                {empresa && <Chip label={`Empresa: ${empresa}`} variant="filled" color="primary" />}
                                {filtro && <Chip label={`Filtro: ${opcionesFiltro.find(o => o.id === filtro)?.name ?? filtro}`} variant="filled" />}
                                {enviarA && (
                                    <Chip
                                        icon={enviarA === 'w' ? <WhatsAppIcon /> : <EmailIcon />}
                                        label={`Canal: ${enviarA === 'w' ? 'WhatsApp' : 'Correo'}`}
                                        variant="outlined"
                                        color={enviarA === 'w' ? 'success' : 'info'}
                                    />
                                )}
                                {seleccionarMensaje && (
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label={`Plantilla seleccionada`}
                                        variant="outlined"
                                        color="success"
                                    />
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Filtros y selección */}
                <Grid size={{ lg: 12 }}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardHeader
                            title="Filtros"
                            subheader="Define a qué clientes y por qué canal deseas enviar"
                            avatar={<FilterAltIcon color="action" />}

                        />
                        <CardContent>
                            <FormControlLabel
                                control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                                label="DATOS DE PRUEBA"
                                sx={{ marginLeft: 5 }}
                            />
                            <Grid container spacing={2}>
                                <Grid size={{ lg: 6 }}>
                                    <ListaEmpresasComponents handlerChange={setEmpresa} />
                                </Grid>

                                <Grid size={{ lg: 6 }}>
                                    <CustomAutocompleteTs
                                        options={opcionesFiltro}
                                        label='Seleccione Filtro'
                                        labelFullField='Filtro'
                                        handleChange={(e, value: any) => setFiltro(value?.id)}
                                    />
                                </Grid>

                                <Grid size={{ lg: 6 }}>
                                    <CustomAutocompleteTs
                                        label="Seleccione Plantilla"
                                        options={mensajesTarea}
                                        optionLabel='tipoMensaje'
                                        optionValue='id'
                                        labelFullField='Plantilla'
                                        handleChange={(e, value: any) => setSeleccionarMensaje(value)}
                                    />
                                </Grid>

                                <Grid size={{ lg: 6 }}>
                                    <CustomAutocompleteTs
                                        label="Envío a:"
                                        options={tipoMensaje}
                                        labelFullField='Seleccione Envío a:'
                                        handleChange={(e, value: any) => setEnviarA(value?.id)}
                                    />
                                </Grid>

                                <Grid size={{ lg: 12 }}>
                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <Tooltip title={!puedeObtenerClientes ? "Selecciona empresa y filtro para obtener clientes" : ""}>
                                            <span style={{ width: '100%' }}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={obtenerDeudasCliente}
                                                    disabled={!puedeObtenerClientes || isSending} // NEW
                                                    startIcon={<PeopleAltIcon />}
                                                >
                                                    Obtener clientes
                                                </Button>
                                            </span>
                                        </Tooltip>

                                        <Tooltip title={!puedePrevisualizar ? "Elige el canal y una plantilla para revisar/editar" : ""}>
                                            <span style={{ width: '100%' }}>
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    fullWidth
                                                    onClick={() => setAbrirModal(true)}
                                                    startIcon={<PreviewIcon />}
                                                    disabled={!puedePrevisualizar || isSending} // NEW
                                                >
                                                    Revisar y editar mensaje
                                                </Button>
                                            </span>
                                        </Tooltip>

                                        <Tooltip title={!puedeEnviar ? "Primero obtiene clientes y selecciona canal + plantilla" : ""}>
                                            <span style={{ width: '100%' }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    fullWidth
                                                    startIcon={<SendIcon />}
                                                    disabled={!puedeEnviar || isSending} // NEW
                                                    onClick={() =>
                                                        enviarA === "w"
                                                            ? enviarMensajesWhatsappMasivos()
                                                            : enviarMensajesEmailMasivos()
                                                    }
                                                >
                                                    Enviar mensajería vía {enviarA === "w" ? "WhatsApp" : enviarA === "c" ? "Email" : "…"}
                                                </Button>
                                            </span>
                                        </Tooltip>
                                    </Stack>

                                    {!puedeEnviar && (
                                        <Box mt={2}>
                                            <Alert severity="info" variant="outlined">
                                                Para habilitar el envío: 1) Obtén clientes, 2) Selecciona el canal (WhatsApp/Correo) y 3) Elige una plantilla.
                                            </Alert>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Tabla de resultados */}
                <Grid size={{ lg: 12 }}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <CustomDataGridTs
                                gridId="clientesMensajeria"
                                rows={deudasClientes}
                                columns={ConfiguracionColumnasMensajeriaMasica()}
                                searchLabel='Buscar'
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Modal de previsualización/edición */}
                <CustomModalTs
                    open={abrirModal}
                    width={1200}
                    positionTop="50%"
                    height="700px"
                    handleClose={() => setAbrirModal(prev => !prev)}
                >
                    <>
                        {enviarA === "w" && (
                            <WhatsappMessageEditor onChangeText={setPlantilla}
                                initialText={seleccionarMensaje ? seleccionarMensaje.mensaje : ""}
                                placeholders={["nombre", "empresa", "contrato", "valorDeuda"]}
                            />
                        )}

                        {enviarA === "c" && (
                            <HtmlEmailEditorPreview onChangeHtml={setPlantilla}
                                initialHtml={seleccionarMensaje ? seleccionarMensaje.mensajeCorreo : ""} />
                        )}
                    </>
                </CustomModalTs>

                {/* NEW: Modal de reporte de fallos WhatsApp */}
                <CustomModalTs
                    open={openReporte}
                    width={700}
                    height="520px"
                    positionTop="50%"
                    handleClose={() => setOpenReporte(false)}
                >
                    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardHeader
                            title={`Reporte de WhatsApp fallidos (${failedWhatsapps.length})`}
                            action={
                                <IconButton onClick={() => setOpenReporte(false)} aria-label="cerrar">
                                    <CloseIcon />
                                </IconButton>
                            }
                        />
                        <CardContent sx={{ overflow: "auto" }}>
                            {failedWhatsapps.length === 0 ? (
                                <Alert severity="success">No hubo fallos en el envío.</Alert>
                            ) : (
                                <>
                                    <Alert severity="warning" sx={{ mb: 2 }}>
                                        Estos números no se pudieron enviar. Revisa y vuelve a intentar.
                                    </Alert>
                                    <List dense>
                                        {failedWhatsapps.map((f, idx) => (
                                            <ListItem key={`${f.telefono}-${idx}`} divider>
                                                <ListItemText
                                                    primary={`${f.nombre || 'Sin nombre'} — ${f.telefono || 'Sin teléfono'}`}
                                                    secondary={f.motivo || 'Error no especificado'}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </CustomModalTs>
            </Grid>
        </>
    )
}

export default EnviarMensajeriaMasiva;
