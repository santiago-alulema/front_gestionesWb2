import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import CustomDatePicker from '@/components/DataGridCommon/CustomDatePicker'
import { CompromisosPagoPorUsuarioInDTO } from '@/model/Dtos/In/CompromisosPagoPorUsuarioInDTO'
import { GestionesPagoPorUsuarioInDTO } from '@/model/Dtos/In/GestionesPagoPorUsuarioInDTO'
import { GestionesPorUsuarioInDTO } from '@/model/Dtos/In/GestionesPorUsuarioInDTO'
import { ReporteEmpresaDto } from '@/model/Dtos/In/ReporteEmpresaDto'
import { ConfiguracionColumnaCompromisosPagoReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaCompromisosPagoReporte'
import { ConfiguracionColumnaReporteEmpresa } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaEmpresasReporte'
import { ConfiguracionColumnaGestionesReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaGestionesReporte'
import { ConfiguracionColumnaPagosReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaPagosReporte'
import { compromisosPagosXUsuarioServicioWeb, gestionesPorEmperesaServicioWeb, gestionesXUsuarioServicioWeb, PagosXUsuarioServicioWeb } from '@/services/Service'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useLoading } from '@/components/LoadingContext'

const ReporteGeneralGestiones = () => {

    const [gestionesReporte, setGestionesReporte] = useState<GestionesPorUsuarioInDTO[]>([]);
    const [pagosReporte, setPagosReporte] = useState<GestionesPagoPorUsuarioInDTO[]>([]);
    const [compromisosPagoReporte, setCompromisosPagoReporte] = useState<CompromisosPagoPorUsuarioInDTO[]>([]);
    const [reportePorEmpresa, setReportePorEmpresa] = useState<ReporteEmpresaDto[]>([]);

    const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

    const { startLoading, stopLoading } = useLoading();

    const styleCard = {
        borderRadius: 4,
        boxShadow: 3,
    }

    const styleCardHeader = {
        backgroundColor: 'primary.main',
        textAlign: 'center',

        color: 'secundary.main',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingY: 0.5,
        paddingX: 1,
        "& .MuiCardHeader-title": {
            fontWeight: 'bold',
            color: 'white',
            fontSize: '1.2rem',
        },
    }

    const cargarCompromisosPagosUsuarios = async () => {
        const respuesta = await compromisosPagosXUsuarioServicioWeb(startDate, endDate);
        setCompromisosPagoReporte(respuesta);
    }

    const cargarPagosUsuarios = async () => {
        const respuesta = await PagosXUsuarioServicioWeb(startDate, endDate);
        setPagosReporte(respuesta);
    }

    const cargarGestionesUsuarios = async () => {
        const respuesta = await gestionesXUsuarioServicioWeb(startDate, endDate);
        setGestionesReporte(respuesta);
    }

    const cargarGestionesXEmpresa = async () => {
        const respuesta = await gestionesPorEmperesaServicioWeb(startDate, endDate);
        setReportePorEmpresa(respuesta);
    }

    useEffect(() => {
        consultarGestiones();
    }, [])

    const consultarGestiones = async () => {
        startLoading();
        await cargarCompromisosPagosUsuarios();
        await cargarPagosUsuarios();
        await cargarGestionesUsuarios();
        await cargarGestionesXEmpresa();
        stopLoading();
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                mb={2}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                }}
            >
                <Grid size={{ lg: 4 }}>
                    <CustomDatePicker
                        label="Fecha inicio"
                        defaultValue={startDate}
                        onChangeValue={(value) => setStartDate(value || '')}
                    />
                </Grid>
                <Grid size={{ lg: 4 }}>
                    <CustomDatePicker
                        label="Fecha fin"
                        defaultValue={endDate}
                        onChangeValue={(value) => setEndDate(value || '')}
                    />
                </Grid>
                <Grid size={{ lg: 4 }}>
                    <Button variant='contained' sx={{ borderRadius: 5 }} onClick={consultarGestiones}>
                        Generar
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                <Grid size={{ lg: 6 }} sx={styleCard}>
                    <CardHeader title="Pagos por usuario" sx={styleCardHeader} />
                    <CardContent>
                        <CustomDataGridTs
                            rows={pagosReporte}
                            gridId='PagosXUsuario'
                            columns={ConfiguracionColumnaPagosReporte()}
                            addNumeration={true}
                            widthNumeration='12%'
                            titleEmptyTable='No existen Datos'
                            searchLabel="Buscar"
                        />
                    </CardContent>
                </Grid>
                <Grid size={{ lg: 6 }} sx={styleCard}>
                    <CardHeader title="Compromisos por usuario" sx={styleCardHeader} />
                    <CardContent>
                        <CustomDataGridTs
                            rows={compromisosPagoReporte}
                            gridId='PagosXUsuario'
                            columns={ConfiguracionColumnaCompromisosPagoReporte()}
                            addNumeration={true}
                            widthNumeration='12%'
                            titleEmptyTable='No existen Datos'
                            searchLabel="Buscar"

                        />
                    </CardContent>
                </Grid>
                <Grid size={{ lg: 6 }} sx={styleCard}>
                    <CardHeader title="Gestiones por usuario" sx={styleCardHeader} />
                    <CardContent>
                        <CustomDataGridTs
                            rows={gestionesReporte}
                            gridId='PagosXUsuario'
                            columns={ConfiguracionColumnaGestionesReporte()}
                            addNumeration={true}
                            widthNumeration='12%'
                            titleEmptyTable='No existen Datos'
                            searchLabel="Buscar"

                        />
                    </CardContent>
                </Grid>
                <Grid size={{ lg: 12 }}>
                    <Card>
                        <CardHeader title="Gestiones por empresa" sx={styleCardHeader} />
                        <CardContent>
                            <CustomDataGridTs
                                rows={reportePorEmpresa}
                                gridId='PagosXUsuario'
                                columns={ConfiguracionColumnaReporteEmpresa()}
                                addNumeration={true}
                                widthNumeration='12%'
                                titleEmptyTable='No existen Datos'
                                searchLabel="Buscar"
                            />
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}

export default ReporteGeneralGestiones