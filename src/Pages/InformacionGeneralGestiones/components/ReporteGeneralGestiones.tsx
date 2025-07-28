import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { CompromisosPagoPorUsuarioInDTO } from '@/model/Dtos/In/CompromisosPagoPorUsuarioInDTO'
import { GestionesPagoPorUsuarioInDTO } from '@/model/Dtos/In/GestionesPagoPorUsuarioInDTO'
import { GestionesPorUsuarioInDTO } from '@/model/Dtos/In/GestionesPorUsuarioInDTO'
import { ConfiguracionColumnaCompromisosPagoReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaCompromisosPagoReporte'
import { ConfiguracionColumnaGestionesReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaGestionesReporte'
import { ConfiguracionColumnaPagosReporte } from '@/Pages/InformacionGeneralGestiones/config/ConfiguracionColumnaPagosReporte'
import { compromisosPagosXUsuarioServicioWeb, gestionesXUsuarioServicioWeb, PagosXUsuarioServicioWeb } from '@/services/Service'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ReporteGeneralGestiones = () => {

    const [gestionesReporte, setGestionesReporte] = useState<GestionesPorUsuarioInDTO[]>([]);
    const [pagosReporte, setPagosReporte] = useState<GestionesPagoPorUsuarioInDTO[]>([]);
    const [compromisosPagoReporte, setCompromisosPagoReporte] = useState<CompromisosPagoPorUsuarioInDTO[]>([]);


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

    useEffect(() => {
        cargarCompromisosPagosUsuarios();
        cargarPagosUsuarios();
        cargarGestionesUsuarios();
    }, [])

    return (
        <>
            <Grid container spacing={2} >
                <Grid size={{ lg: 4 }} sx={styleCard}>
                    <CardHeader title="Pagos por usuario" sx={styleCardHeader} />
                    <CardContent>
                        <CustomDataGridTs
                            rows={pagosReporte}
                            gridId='PagosXUsuario'
                            columns={ConfiguracionColumnaPagosReporte()}
                            addNumeration={true}
                            hasPagination={false}
                            widthNumeration='12%'
                            titleEmptyTable='No existen Datos'
                            searchLabel="Buscar"
                        />
                    </CardContent>
                </Grid>
                <Grid size={{ lg: 4 }} sx={styleCard}>
                    <CardHeader title="Compromisos por usuario" sx={styleCardHeader} />
                    <CardContent>
                        <CustomDataGridTs
                            rows={compromisosPagoReporte}
                            gridId='PagosXUsuario'
                            columns={ConfiguracionColumnaCompromisosPagoReporte()}
                            addNumeration={true}
                            hasPagination={false}
                            widthNumeration='12%'
                            titleEmptyTable='No existen Datos'
                            searchLabel="Buscar"

                        />
                    </CardContent>
                </Grid>
                <Grid size={{ lg: 4 }} sx={styleCard}>
                    <CardHeader title="Gestiones por usuario" sx={styleCardHeader} />
                    <CardContent>
                        <CustomDataGridTs
                            rows={gestionesReporte}
                            gridId='PagosXUsuario'
                            columns={ConfiguracionColumnaGestionesReporte()}
                            addNumeration={true}
                            hasPagination={false}
                            widthNumeration='12%'
                            titleEmptyTable='No existen Datos'
                            searchLabel="Buscar"

                        />
                    </CardContent>
                </Grid>
                <Grid size={{ lg: 4 }}>

                </Grid>

            </Grid>
        </>
    )
}

export default ReporteGeneralGestiones