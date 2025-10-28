import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { ConfigurarColimnasMovimientoDeudas } from "@/Pages/DeudoresGestionPage/config/ConfigurarColimnasMovimientoDeudas";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";
import { movimientoDeudasPorDeuda } from "@/Pages/DeudoresGestionPage/services/GestionDeudaServicios";
import { Box, Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';

const MovimientosDeuda = () => {
    const { deudaSeleccionada, setAbrirModalInformacionDeuda } = useGestionarDeudas();
    const [movimientosDeuda, setMovimientosDeuda] = useState<MovimientosDeudaInDTO[]>([]);

    const onInit = async () => {
        const respuesta = await movimientoDeudasPorDeuda(deudaSeleccionada.idDeuda);
        setMovimientosDeuda(respuesta);
    }
    useEffect(() => {
        onInit()
    }, [])
    const html = `Historial de Deuda: <strong>${deudaSeleccionada?.numeroFactura ?? ''}</strong>`;
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 12 }}>
                    <Typography
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
                    />
                </Grid>
                <Grid size={{ lg: 12 }}>
                    <CustomDataGridTs
                        rows={movimientosDeuda}
                        columns={ConfigurarColimnasMovimientoDeudas()}
                        gridId="gidChartOfAccounts"
                        columsHide={['id']}
                        hiddenFilterColumn={['actions']}
                        iconDirectionFilter="end"
                        searchLabel={"Buscar"}
                        titleEmptyTable="No existen movimientos para la deuda"
                    />
                </Grid>
            </Grid >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" sx={{ borderRadius: 5, textAlign: 'left' }} onClick={() => setAbrirModalInformacionDeuda(false)} >Cerrar</Button>
            </Box>

        </>
    )
}

export default MovimientosDeuda