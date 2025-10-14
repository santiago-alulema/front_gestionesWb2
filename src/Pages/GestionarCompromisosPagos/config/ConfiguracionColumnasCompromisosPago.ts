import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasCompromisosPago = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedulaCliente',
                title: 'Cedula',
                width: '10%',
                align: 'center'
            },
            {
                name: 'nombreCliente',
                title: 'Cliente',
                width: '15%',
                align: 'left'
            },
            {
                name: 'numeroFactura',
                title: 'º Factura',
                width: '9%',
                align: 'left'
            },
            {
                name: 'tipoTarea',
                title: 'Tipo Tarea',
                width: '12%',
                align: 'left'
            },
            {
                name: 'valorCompromisoPago',
                title: 'Valor del Compromiso',
                width: '8%',
                align: 'left'
            },
            {
                name: 'saldoDeuda',
                title: 'Deuda Total',
                width: '8%',
                align: 'left'
            },
            {
                name: 'montoCobrar',
                title: 'Monto a Cobrar',
                width: '8%',
                align: 'left'
            },
            {
                name: 'tramo',
                title: 'Tramo',
                width: '10%',
                align: 'center'
            },
            {
                name: 'gestor',
                title: 'Gestor',
                width: '10%',
                align: 'center'
            },
            {
                name: 'actions',
                title: '',
                getCellValue: (row: any) => row,
                width: '10%',
                align: 'center',
                hiddenFilterColumn: true
            }
        ],
        []
    );

    return columns;
};
