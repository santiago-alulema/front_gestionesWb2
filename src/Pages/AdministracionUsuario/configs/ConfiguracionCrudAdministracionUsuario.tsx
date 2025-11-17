import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionCrudAdministracionUsuario = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'nombreUsuario',
                title: 'Numero Factura',
                width: '13%',
                align: 'center'
            },
            {
                name: 'rol',
                title: 'Rol',
                width: '11%',
                align: 'center'
            },
            {
                name: 'email',
                title: 'Email',
                width: '22%',
                align: 'left'
            },
            {
                name: 'telefono',
                title: 'Telefono',
                width: '10%',
                align: 'left'
            },
            {
                name: 'nombreCompleto',
                title: 'Nombre Completo',
                width: '18%',
                align: 'left'
            },
            {
                name: 'estado',
                title: 'Estado',
                width: '11%',
                align: 'center'
            },
            {
                name: 'actions',
                title: 'Acciones',
                getCellValue: (row: any) => row,
                width: '15%',
                align: 'center',
                hiddenFilterColumn: true

            }
        ],
        []
    );

    return columns;
};
