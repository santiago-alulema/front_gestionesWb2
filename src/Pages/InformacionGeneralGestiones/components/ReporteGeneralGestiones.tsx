import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { CompromisosPagoPorUsuarioInDTO } from '@/model/Dtos/In/CompromisosPagoPorUsuarioInDTO'
import { GestionesPagoPorUsuarioInDTO } from '@/model/Dtos/In/GestionesPagoPorUsuarioInDTO'
import { GestionesPorUsuarioInDTO } from '@/model/Dtos/In/GestionesPorUsuarioInDTO'
import { ReporteEmpresaDto } from '@/model/Dtos/In/ReporteEmpresaDto'
import { ConfiguracionColumnaCompromisosPagoReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaCompromisosPagoReporte'
import { ConfiguracionColumnaReporteEmpresa } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaEmpresasReporte'
import { ConfiguracionColumnaGestionesReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaGestionesReporte'
import { ConfiguracionColumnaPagosReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaPagosReporte'
import { compromisosPagosXUsuarioServicioWeb, gestionesPorEmperesaServicioWeb, gestionesXUsuarioServicioWeb, PagosXUsuarioServicioWeb } from '@/services/Service'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ReporteGeneralGestiones = () => {

    const [gestionesReporte, setGestionesReporte] = useState<GestionesPorUsuarioInDTO[]>([]);
    const [pagosReporte, setPagosReporte] = useState<GestionesPagoPorUsuarioInDTO[]>([]);
    const [compromisosPagoReporte, setCompromisosPagoReporte] = useState<CompromisosPagoPorUsuarioInDTO[]>([]);
    const [reportePorEmpresa, setReportePorEmpresa] = useState<ReporteEmpresaDto[]>([]);

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
        paddingY: 1.5,
        paddingX: 2,
        "& .MuiCardHeader-title": {
            fontWeight: 'bold',
            color: 'white',
        },
    }

    const cargarCompromisosPagosUsuarios = async () => {
        const respuesta = await compromisosPagosXUsuarioServicioWeb();
        setCompromisosPagoReporte(respuesta);
    }

    const cargarPagosUsuarios = async () => {
        const respuesta = await PagosXUsuarioServicioWeb();
        setPagosReporte(respuesta);
    }

    const cargarGestionesUsuarios = async () => {
        const respuesta = await gestionesXUsuarioServicioWeb();
        setGestionesReporte(respuesta);
    }

    const cargarGestionesXEmpresa = async () => {
        const respuesta = await gestionesPorEmperesaServicioWeb();
        setReportePorEmpresa(respuesta);
    }

    useEffect(() => {
        cargarCompromisosPagosUsuarios();
        cargarPagosUsuarios();
        cargarGestionesUsuarios();
        cargarGestionesXEmpresa();
    }, [])

    return (
        <>
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
                <Grid size={{ lg: 6 }}>
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