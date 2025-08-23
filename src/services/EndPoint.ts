const END_POINT = {
    LOGIN: "Usuarios/login",
    UPLOAD_DEUDAS_EXCEL: "UploadFile/upload-excel-deudas",
    UPLOAD_DEUDORES_EXCEL: "UploadFile/upload-excel-deudores",
    LISTAR_DEUDORES: 'Cliente/listar-clientes',
    UPLOAD_TELEFONOS_DEUDORES: 'Cliente/grabar-telefonos-cliente',
    LISTAR_DEUDAS_POR_CLIENTE: 'Cliente/deudas-por-cliente',

    BUCAR_DEUDA_POR_ID: 'Cliente/buscar-deuda-por-id',
    BUCAR_DEUDOR_POR_ID: 'Cliente/buscar-cliente-por-id',



    TIPO_GESTIONES_PADRE: 'TipoGestion/tipo-gestion-padre',
    TIPO_GESTIONES_HIJO_POR_PADRE_ID: 'TipoGestion/tipo-gestion-por-padre',
    TELEFONOS_ACTIVOS_CLIENTE: 'Cliente/listar-telefonos-activos-cliente',
    VERIFICAR_ESTADO_TELEFONO_CLIENTE: 'Cliente/verificar-telefono-activos-cliente',
    GRABAR_TELEFONO_CLIENTE: 'Cliente/grabar-telefono-nuevo-cliente',
    DESACTIVAR_TELEFONO: 'cliente/desactivar-telefono',
    GRABAR_COMPROMISO_PAGO: 'Gestiones/grabar-compromiso-pago',
    GRABAR_PAGO: 'Gestiones/grabar-pago',
    GRABAR_GESTION: 'Gestiones/grabar-gestion',
    GESTIONES_REPORTE: 'Gestiones/gestiones-reporte',
    COMPROMISOS_REPORTE: 'Gestiones/compromiso-reporte',
    COMPROMISO_PAGO: 'Cliente/listar-compromisos-pago',
    ACTUALIZAR_COMPROMISO_PAGO: 'Cliente/actualizar-estado-compromiso',
    OBTENER_FORMAS_PAGO_ACTIVOS: 'FormaPago',
    OBTENER_TODOS_TIPOS_ACERCAMIENTO_DEUDORES: "TipoContactoGestion",
    GESTIONES_POR_USUARIO: "ReporteGeneralGestiones/gestiones-por-usuario",
    COMPROMISOS_DE_PAGO_POR_USUARIO: "ReporteGeneralGestiones/compromisos-pago-por-usuario",
    PAGOS_POR_USUARIO: "ReporteGeneralGestiones/gestiones-pago-por-usuario",
    PAGOS_COMPROMISOS_GESTION_POR_USUARIO: "ReporteGeneralGestiones/reporte-por-empresa-mes-actual",

    OBTENER_RESULTADOS: "OpcionesGestion/obtener-respuesta-gestion",
    OBTENER_TIPO_CONTACTO: "OpcionesGestion/obtener-tipo-contacto",
    OBTENER_RESPUESTA: "OpcionesGestion/obtener-respuesta-tipo-contacto",

    BANCOS_ACTIVOS: "OpcionesRegistrarPagos/bancos-activos",
    CUENTAS_ACTIVAS: "OpcionesRegistrarPagos/cuentas-activos",
    TRANSACCIONES_ACTIVAS: "OpcionesRegistrarPagos/transacciones-activas",
    ABONO_LIQUIDACIONES_ACTIVAS: "OpcionesRegistrarPagos/abono-liquidacion-activas",

    TAREAS_HOY: "Gestiones/compromiso-pagos"



}

export default END_POINT;