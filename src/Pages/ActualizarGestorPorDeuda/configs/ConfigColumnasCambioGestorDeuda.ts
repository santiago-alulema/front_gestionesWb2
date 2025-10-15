import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigColumnasCambioGestorDeuda = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'numeroFactura',
                title: 'Numero Factura',
                width: '15%',
                align: 'center'
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
                width: '15%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Cliente',
                width: '20%',
                align: 'left'
            },
            {
                name: 'ciudad',
                title: 'Ciudad',
                width: '10%',
                align: 'left'
            },
            {
                name: 'nombreCompleto',
                title: 'Gestor actual',
                width: '15%',
                align: 'left'
            },
            {
                name: 'actions',
                title: 'Acciones',
                getCellValue: (row: any) => row,
                width: '14%',
                align: 'center',
                hiddenFilterColumn: true

            }
        ],
        []
    );

    return columns;
};
