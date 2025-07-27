const END_POINT = {
    LOGIN: "Usuarios/login",
    UPLOAD_DEUDAS_EXCEL: "UploadFile/upload-excel-deudas",
    UPLOAD_DEUDORES_EXCEL: "UploadFile/upload-excel-deudores",
    LISTAR_DEUDORES: 'Cliente/listar-clientes',
    UPLOAD_TELEFONOS_DEUDORES: 'Cliente/grabar-telefonos-cliente',
    LISTAR_DEUDAS_POR_CLIENTE: 'Cliente/deudas-por-cliente',
    TIPO_GESTIONES_PADRE: 'TipoGestion/tipo-gestion-padre',
    TIPO_GESTIONES_HIJO_POR_PADRE_ID: 'TipoGestion/tipo-gestion-por-padre',
    TELEFONOS_ACTIVOS_CLIENTE: 'Cliente/listar-telefonos-activos-cliente',
    VERIFICAR_ESTADO_TELEFONO_CLIENTE: 'Cliente/verificar-telefono-activos-cliente',
    GRABAR_TELEFONO_CLIENTE: 'Cliente/grabar-telefono-nuevo-cliente',
    DESACTIVAR_TELEFONO: 'cliente/desactivar-telefono',
    GRABAR_COMPROMISO_PAGO: 'Gestiones/grabar-compromiso-pago',
    GRABAR_GESTION: 'Gestiones/grabar-gestion',
    GESTIONES_REPORTE: 'Gestiones/gestiones-reporte',
    COMPROMISOS_REPORTE: 'Gestiones/compromiso-reporte',
    COMPROMISO_PAGO: 'Cliente/listar-compromisos-pago',
    ACTUALIZAR_COMPROMISO_PAGO: 'Cliente/actualizar-estado-compromiso'


}

export default END_POINT;