import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasSaldosCrecos = () => {
    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'coD_EMPRESA',
                title: 'Cod. Empresa',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descP_EMPRESA',
                title: 'Empresa',
                width: '10%',
                align: 'left'
            },
            {
                name: 'coD_U_NEGOCIO',
                title: 'Cod. U. Negocio',
                width: '8%',
                align: 'center'
            },
            {
                name: 'desC_U_NEGOCIO',
                title: 'U. Negocio',
                width: '10%',
                align: 'left'
            },
            {
                name: 'coD_CARTERA',
                title: 'Cod. Cartera',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descriP_CARTERA',
                title: 'Cartera',
                width: '12%',
                align: 'left'
            },
            {
                name: 'coD_GESTOR',
                title: 'Cod. Gestor',
                width: '8%',
                align: 'center'
            },
            {
                name: 'desC_GESTOR',
                title: 'Gestor',
                width: '10%',
                align: 'left'
            },
            {
                name: 'imes',
                title: 'Mes',
                width: '5%',
                align: 'center'
            },
            {
                name: 'iano',
                title: 'Año',
                width: '6%',
                align: 'center'
            },
            {
                name: 'coD_OFICINA',
                title: 'Cod. Oficina',
                width: '8%',
                align: 'center'
            },
            {
                name: 'cdescripcioN_OFICINA',
                title: 'Oficina',
                width: '10%',
                align: 'left'
            },
            {
                name: 'coD_TCREDITO',
                title: 'Cod. T. Crédito',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descriP_TCREDITO',
                title: 'Tipo Crédito',
                width: '10%',
                align: 'left'
            },
            {
                name: 'cnumeroidentificacion',
                title: 'Identificación',
                width: '10%',
                align: 'center'
            },
            {
                name: 'coD_OPERACION',
                title: 'Operación',
                width: '10%',
                align: 'left'
            },
            {
                name: 'cnumerotarjeta',
                title: 'Nro. Tarjeta',
                width: '12%',
                align: 'left'
            },
            {
                name: 'ciclO_CORTE',
                title: 'Ciclo Corte',
                width: '8%',
                align: 'center'
            },
            {
                name: 'desC_CICLOCORTE',
                title: 'Desc. Ciclo Corte',
                width: '12%',
                align: 'left'
            },
            {
                name: 'diaS_VENCIDOS',
                title: 'Días Vencidos',
                width: '8%',
                align: 'center'
            },
            {
                name: 'itramo',
                title: 'Tramo (Cód.)',
                width: '8%',
                align: 'center'
            },
            {
                name: 'cdescripciontramo',
                title: 'Tramo',
                width: '12%',
                align: 'left'
            },
            {
                name: 'fechA_MAX_PAGO',
                title: 'Fecha Máx. Pago',
                width: '12%',
                align: 'center'
            },
            {
                name: 'valoR_DEUDA',
                title: 'Valor Deuda',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_PAGO_MINIMO',
                title: 'Pago Mínimo',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_CORRIENTE',
                title: 'Valor Corriente',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_VENCIDO',
                title: 'Valor Vencido',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_POR_VENCER',
                title: 'Por Vencer',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_MORA',
                title: 'Mora',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_GESTION',
                title: 'Gestión',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_VENCIDO_CORTEANTERIOR',
                title: 'Vencido Corte Ant.',
                width: '12%',
                align: 'right'
            },
            {
                name: 'primerA_CUOTA_VENCIDA',
                title: '1ra Cuota Vencida',
                width: '12%',
                align: 'center'
            },
            {
                name: 'negociacioN_ACTIVA',
                title: 'Negociación Activa',
                width: '10%',
                align: 'center'
            },
            {
                name: 'dfechaejecucion',
                title: 'Fecha Ejecución',
                width: '12%',
                align: 'center'
            },
            {
                name: 'fechA_INGRESO',
                title: 'Fecha Ingreso',
                width: '12%',
                align: 'center'
            },
            {
                name: 'calificacioN_CLIENTE',
                title: 'Calificación',
                width: '8%',
                align: 'center'
            },
            {
                name: 'f_ULTIMO_CORTE',
                title: 'Último Corte',
                width: '12%',
                align: 'center'
            },
            {
                name: 'fechA_ULT_PAGO',
                title: 'Último Pago',
                width: '12%',
                align: 'center'
            },
            {
                name: 'vaL_ULT_PAGO',
                title: 'Valor Últ. Pago',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valoR_PAGO_MINIMO_ACTUALIZADO',
                title: 'Pago Mín. Act.',
                width: '12%',
                align: 'right'
            },
            {
                name: 'codigocliente',
                title: 'Cod. Cliente',
                width: '10%',
                align: 'center'
            }
        ],
        []
    );

    return columns;
};
