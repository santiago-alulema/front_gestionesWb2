import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigurarColumnaDeudores = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedula',
                title: 'Cedula',
                width: '15%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Nombre',
                width: '25%',
                align: 'left'
            },
            {
                name: 'direccion',
                title: 'direccion',
                width: '15%',
                align: 'left'
            },
            {
                name: 'telefono',
                title: 'Telefono',
                width: '10%',
                align: 'left'
            },
            {
                name: 'correo',
                title: 'Correo',
                width: '15%',
                align: 'center'
            },
            {
                name: 'descripcion',
                title: 'Descripcion',
                width: '10%',
                align: 'left'
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
