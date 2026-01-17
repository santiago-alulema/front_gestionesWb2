import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const HistorialGestionesConfigColums = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'idDeudor',
                title: 'Cedula',
                width: '10%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Cliente',
                width: '15%',
                align: 'left'
            },
            {
                name: 'numeroFactura',
                title: 'Numero Factura',
                width: '10%',
                align: 'left'
            },
            {
                name: 'empresa',
                title: 'Empresa',
                width: '11%',
                align: 'center'
            },
            {
                name: 'tramo',
                title: 'Tramo',
                width: '10%',
                align: 'center'
            },
            {
                name: 'ciudad',
                title: 'Ciudad',
                width: '8%',
                align: 'left'
            },
            {
                name: 'saldoDeuda',
                title: 'Saldo Deuda',
                width: '8%',
                align: 'center'
            },
            {
                name: 'montoCobrar',
                title: 'Monto Cobrar',
                width: '8%',
                align: 'center'
            },
            {
                name: 'nombreCompleto',
                title: 'Gestor',
                width: '10%',
                align: 'left'
            },
            {
                name: 'actions',
                title: 'Acciones',
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
