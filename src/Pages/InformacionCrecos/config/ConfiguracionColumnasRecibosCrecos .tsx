import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasRecibosCrecos = () => {
    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'codRecibo',
                title: 'Recibo',
                width: '10%',
                align: 'center'
            },
            {
                name: 'numIdentificacion',
                title: 'Identificación',
                width: '12%',
                align: 'center'
            },
            {
                name: 'cestadoRegistro',
                title: 'Estado Registro',
                width: '10%',
                align: 'center'
            },
            {
                name: 'codEmpresa',
                title: 'Cod. Empresa',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcEmpresa',
                title: 'Empresa',
                width: '12%',
                align: 'left'
            },
            {
                name: 'codUNegocio',
                title: 'Cod. U. Negocio',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcUNegocio',
                title: 'U. Negocio',
                width: '10%',
                align: 'left'
            },
            {
                name: 'codTCartera',
                title: 'Cod. T. Cartera',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcTCartera',
                title: 'Tipo Cartera',
                width: '12%',
                align: 'left'
            },
            {
                name: 'codOficina',
                title: 'Cod. Oficina',
                width: '8%',
                align: 'center'
            },
            {
                name: 'cDescripcionOficina',
                title: 'Oficina',
                width: '12%',
                align: 'left'
            },
            {
                name: 'codPagoReferencial',
                title: 'Pago Referencial',
                width: '12%',
                align: 'left'
            },
            {
                name: 'codMoneda',
                title: 'Cod. Moneda',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcMoneda',
                title: 'Moneda',
                width: '10%',
                align: 'left'
            },
            {
                name: 'codTPago',
                title: 'Cod. T. Pago',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcTPago',
                title: 'Tipo Pago',
                width: '12%',
                align: 'left'
            },
            {
                name: 'codCaja',
                title: 'Cod. Caja',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcCaja',
                title: 'Caja',
                width: '10%',
                align: 'left'
            },
            {
                name: 'codGestor',
                title: 'Cod. Gestor',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcGestor',
                title: 'Gestor',
                width: '10%',
                align: 'left'
            },
            {
                name: 'codTRecibo',
                title: 'Cod. T. Recibo',
                width: '8%',
                align: 'center'
            },
            {
                name: 'descripcTRecibo',
                title: 'Tipo Recibo',
                width: '10%',
                align: 'left'
            },
            {
                name: 'nombreArchivo',
                title: 'Nombre Archivo',
                width: '14%',
                align: 'left'
            },
            {
                name: 'fechaPago',
                title: 'Fecha Pago',
                width: '12%',
                align: 'center'
            },
            {
                name: 'monto',
                title: 'Monto',
                width: '10%',
                align: 'right'
            },
            {
                name: 'cambio',
                title: 'Cambio',
                width: '8%',
                align: 'right'
            }
        ],
        []
    );

    return columns;
};
