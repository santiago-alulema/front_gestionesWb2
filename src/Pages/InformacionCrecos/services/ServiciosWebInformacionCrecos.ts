// src/Pages/InformacionCrecos/services/ServiciosWebInformacionCrecos.ts

import { request } from "@/utils/AxiosUtils";
import END_POINT_INFORMACION_CRECOS from "./EndPointInformacionCrecos";
import {
    CarteraAsignadaCrecos,
    SaldoClienteCrecos,
    ReciboPagosCrecos,
    ReciboDetalleCrecos,
    CuotaOperacionCrecos
} from "../models/InformacionCrecosModels";

export const GET_CARTERA_CRECOS = () =>
    request<CarteraAsignadaCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.CARTERA
    );

export const GET_SALDOS_CRECOS = () =>
    request<SaldoClienteCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.SALDOS
    );

export const GET_RECIBOS_CRECOS = () =>
    request<ReciboPagosCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.RECIBOS
    );

export const GET_RECIBOS_DETALLE_CRECOS = () =>
    request<ReciboDetalleCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.RECIBOS_DETALLE
    );

export const GET_CUOTAS_CRECOS = () =>
    request<CuotaOperacionCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.CUOTAS
    );



export const DESCARGAR_EXCEL_CARTERA = () =>
    request<CuotaOperacionCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.CARTERA_EXCEL,
        null,
        null,
        true
    );


export const DESCARGAR_EXCEL_CUOTAS = () =>
    request<CuotaOperacionCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.CUOTAS_EXCEL,
        null,
        null,
        true
    );


export const DESCARGAR_EXCEL_RECIBOS = () =>
    request<CuotaOperacionCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.RECIBOS_EXCEL,
        null,
        null,
        true
    );

export const DESCARGAR_EXCEL_RECIBOS_DETALLE = () =>
    request<CuotaOperacionCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.RECIBOS_DETALLE_EXCEL,
        null,
        null,
        true
    );

export const DESCARGAR_EXCEL_SALDO = () =>
    request<CuotaOperacionCrecos[]>(
        "get",
        END_POINT_INFORMACION_CRECOS.SALDOS_EXCEL,
        null,
        null,
        true
    );

