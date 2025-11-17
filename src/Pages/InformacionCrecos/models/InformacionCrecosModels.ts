// src/Pages/InformacionCrecos/models/InformacionCrecosModels.ts

export interface CarteraAsignadaCrecos {
    id: string;
    cod_EMPRESA?: string | null;
    empresa?: string | null;
    cod_UNIDAD_NEGOCIO?: string | null;
    unidad_NEGOCIO?: string | null;
    cod_TIPO_CARTERA?: string | null;
    tipo_CARTERA?: string | null;
    imes?: number | null;
    iano?: number | null;
    cNUMEROIDENTIFICACION?: string | null;
    cNOMBRECOMPLETO?: string | null;
    cod_TIPO_GESTOR?: string | null;
    cDESCRIPCION?: string | null;
    bCUOTAIMPAGA?: string | null;
    dIAS_MORA?: number | null;
    dFECHAVENCIMIENTO?: string | null;
    iVALORDEUDATOTAL?: number | null;
    iCICLOCORTE?: number | null;
    cod_PAIS?: string | null;
    pais?: string | null;
    cod_PROVINCIA?: string | null;
    provincia?: string | null;
    cod_CANTON?: string | null;
    canton?: string | null;
    cod_ZONA?: string | null;
    zona?: string | null;
    cod_BARRIO?: string | null;
    barrio?: string | null;
    cod_GESTOR?: string | null;
    gestor?: string | null;
    codigocliente?: string | null;
    nombrearchivo?: string | null;
}

export interface SaldoClienteCrecos {
    id: string;
    cod_EMPRESA?: string | null;
    descp_EMPRESA?: string | null;
    cod_U_NEGOCIO?: string | null;
    desc_U_NEGOCIO?: string | null;
    cod_CARTERA?: string | null;
    descrip_CARTERA?: string | null;
    cod_GESTOR?: string | null;
    desc_GESTOR?: string | null;
    imes?: number | null;
    iano?: number | null;
    cod_OFICINA?: string | null;
    cDESCRIPCION_OFICINA?: string | null;
    cod_TCREDITO?: string | null;
    descrip_TCREDITO?: string | null;
    cNUMEROIDENTIFICACION?: string | null;
    cod_OPERACION?: string | null;
    cNUMEROTARJETA?: string | null;
    ciclo_CORTE?: string | null;
    desc_CICLOCORTE?: string | null;
    dIAS_VENCIDOS?: number | null;
    iTRAMO?: number | null;
    cDESCRIPCIONTRAMO?: string | null;
    fECHA_MAX_PAGO?: string | null;
    vALOR_DEUDA?: number | null;
    vALOR_PAGO_MINIMO?: number | null;
    vALOR_CORRIENTE?: number | null;
    vALOR_VENCIDO?: number | null;
    vALOR_POR_VENCER?: number | null;
    vALOR_MORA?: number | null;
    vALOR_GESTION?: number | null;
    vALOR_VENCIDO_CORTEANTERIOR?: number | null;
    pRIMERA_CUOTA_VENCIDA?: string | null;
    nEGOCIACION_ACTIVA?: string | null;
    dFECHAEJECUCION?: string | null;
    fECHA_INGRESO?: string | null;
    cALIFICACION_CLIENTE?: string | null;
    f_ULTIMO_CORTE?: string | null;
    fECHA_ULT_PAGO?: string | null;
    vAL_ULT_PAGO?: number | null;
    vALOR_PAGO_MINIMO_ACTUALIZADO?: number | null;
    codigocliente?: string | null;
}

export interface ReciboPagosCrecos {
    id: string;
    codRecibo: string;
    cestadoRegistro?: string | null;
    codEmpresa?: string | null;
    descripcEmpresa?: string | null;
    codUNegocio?: string | null;
    descripcUNegocio?: string | null;
    codTCartera?: string | null;
    descripcTCartera?: string | null;
    codOficina?: string | null;
    cDescripcionOficina?: string | null;
    numIdentificacion?: string | null;
    codPagoReferencial?: string | null;
    codMoneda?: string | null;
    descripcMoneda?: string | null;
    codTPago?: string | null;
    descripcTPago?: string | null;
    codCaja?: string | null;
    descripcCaja?: string | null;
    codGestor?: string | null;
    descripcGestor?: string | null;
    codTRecibo?: string | null;
    nombreArchivo?: string | null;
    descripcTRecibo?: string | null;
    fechaPago?: string | null;      // llega como string ISO
    dFechaReverso?: string | null;
    monto?: number | null;
    cambio?: number | null;
}

export interface ReciboDetalleCrecos {
    id: string;
    iReciboDetalle: string;
    codRecibo?: string | null;
    iCodigoOperacion?: string | null;
    numCuota?: number | null;
    nombreArchivo?: string | null;
    codRubro?: string | null;
    cDescripcionRubro?: string | null;
    valorRecibo?: number | null;
}

export interface CuotaOperacionCrecos {
    id: string;
    codOperacion: string;
    codCuota: string;
    numeroCuota: number;
    fechaVencimiento?: string | null;
    fechaCorte?: string | null;
    fechaUltimoPago?: string | null;
    dFechaPostergacion?: string | null;
    codEstadoCuota?: string | null;
    descEstadoOperacion?: string | null;
    tasaMora?: number | null;
    codEstadoRegistro?: string | null;
    desEstadoRegistro?: string | null;
    iValorTotalCuota?: number | null;
    iValorCuota?: number | null;
    valorCapitalInteres?: number | null;
    valorCargos?: number | null;
    valorOtrosCargos?: number | null;
}
