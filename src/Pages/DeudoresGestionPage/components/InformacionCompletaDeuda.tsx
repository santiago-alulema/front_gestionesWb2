import React, { useEffect } from "react";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Paper,
    Box,
    Chip,
    Button,
    AccordionDetails,
    Accordion,
    AccordionSummary,
    AccordionActions,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Opcional: para formato en español
import { useSearchParams } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const InformacionCompletaDeuda = () => {
    const { deudaSeleccionada, setAbrirModalInformacionDeuda, setAbrirModalGestionarDeuda } = useGestionarDeudas();
    const [searchParams] = useSearchParams();
    const deudaId = searchParams.get("deudaId");
    const deudorId = searchParams.get("deudorId");
    if (!deudaSeleccionada) {
        return (
            <Typography variant="body1" color="textSecondary">
                Seleccione una deuda para ver los detalles.
            </Typography>
        );
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        return format(new Date(dateString), "dd MMMM yyyy", { locale: es });
    };

    const titleStyle = {
        fontWeight: "bold",
        color: "text.secondary",
        mb: 1,
    };

    const valueStyle = {
        color: "text.primary",
        mb: 2,
    };

    const seleccionarDeudaFuncion = () => {
        setAbrirModalGestionarDeuda(true)
    }

    return (
        <>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 1, }} >
                <CardContent
                    sx={{ borderRadius: 2, boxShadow: 1, p: "1.2rem !important" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                            Detalles de la Deuda
                        </Typography>{
                            !deudaId && (
                                <Button variant="contained" sx={{ borderRadius: 5 }} onClick={seleccionarDeudaFuncion}>Gestionar</Button>
                            )
                        }

                    </Box>

                    <Divider sx={{ mb: 1 }} />
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 12 }} >
                            <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                                <Typography variant="subtitle2" sx={titleStyle}>
                                    Información Producto
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ lg: 6 }}>
                            <DetailItem
                                title="Producto"
                                value={deudaSeleccionada.productoDescripcion}

                            />

                        </Grid>
                        <Grid size={{ lg: 3 }}>
                            <DetailItem
                                title="Agencia"
                                value={deudaSeleccionada.agencia}
                            />
                        </Grid>
                        <Grid size={{ lg: 3 }}>
                            <DetailItem
                                title="Ciudad"
                                value={deudaSeleccionada.ciudad}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 1 }} />

                    <Grid container spacing={5}>
                        <Grid size={{ xs: 12, md: 4 }} >
                            <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                                <Typography variant="subtitle2" sx={titleStyle}>
                                    Información Básica
                                </Typography>

                                <DetailItem
                                    title="Número de Factura"
                                    value={deudaSeleccionada.numeroFactura}
                                />
                                <DetailItem
                                    title="Empresa"
                                    value={deudaSeleccionada.empresa}
                                />
                                <DetailItem
                                    title="Fecha de Venta"
                                    value={formatDate(deudaSeleccionada.fechaVenta)}
                                />
                                <DetailItem
                                    title="Último Pago"
                                    value={formatDate(deudaSeleccionada.fechaUltimoPago)}
                                />
                                <DetailItem
                                    title="Días en Mora"
                                    value={deudaSeleccionada.diasMora?.toString()}
                                />

                                <DetailItem
                                    title="Estado de Deuda"
                                    value={deudaSeleccionada.estado?.toString()}
                                />

                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                                <Typography variant="subtitle2" sx={titleStyle}>
                                    Detalles Financieros
                                </Typography>

                                <DetailItem
                                    title="Saldo Actual"
                                    value={`$${deudaSeleccionada.saldoDeuda?.toLocaleString() || "N/A"}`}
                                />
                                <DetailItem
                                    title="Intereses"
                                    value={`$${deudaSeleccionada.interes?.toLocaleString() || "N/A"}`}
                                />
                                <DetailItem
                                    title="Gastos de Cobranza"
                                    value={`$${deudaSeleccionada.gastosCobranzas?.toLocaleString() || "N/A"}`}
                                />
                                <DetailItem
                                    title="Descuento"
                                    value={`${deudaSeleccionada.descuento}%`}
                                />
                                <DetailItem
                                    title="Monto a Cobrar"
                                    value={`$${deudaSeleccionada.montoCobrar?.toLocaleString() || "N/A"}`}
                                />
                                <DetailItem
                                    title="Clasificación"
                                    value={deudaSeleccionada.clasificacion}
                                />
                                <DetailItem
                                    title="Tramo"
                                    value={deudaSeleccionada.tramo}
                                />
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                                <Typography variant="subtitle2" sx={titleStyle}>
                                    Plan de Pagos
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12 }}>
                                        <DetailItem
                                            title="Créditos"
                                            value={deudaSeleccionada.creditos?.toString()}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <DetailItem
                                            title="Total de Cuotas"
                                            value={deudaSeleccionada.numeroCuotas?.toString()}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <DetailItem
                                            title="Valor por Cuota"
                                            value={`$${deudaSeleccionada.valorCuota?.toLocaleString()}`}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" sx={{ borderRadius: 5, textAlign: 'left' }} onClick={() => setAbrirModalInformacionDeuda(false)} >Cerrar</Button>
            </Box>

        </>
    );
};

const DetailItem = ({ title, value, fontsize = '13px' }: { title: string; value?: string; fontsize?: string }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="textSecondary">
            {title}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: fontsize, textAlign: 'justify', marginRight: 2 }}>
            {value || "N/A"}
        </Typography>
    </Box>
);

export default InformacionCompletaDeuda;