import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasGestiones = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedula',
                title: 'Cedula',
                width: '13%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Deudor',
                width: '13%',
                align: 'left'
            },
            {
                name: 'tipoResultado',
                title: 'Resultado',
                width: '12%',
                align: 'left'
            },
            {
                name: 'tipoContactoResultado',
                title: 'Gestor',
                width: '12%',
                align: 'left'
            },
            {
                name: 'respuestaTipoContacto',
                title: 'Respuesta',
                width: '12%',
                align: 'left'
            },
            {
                name: 'email',
                title: 'email',
                width: '12%',
                align: 'left'
            },
            {
                name: 'descripcion',
                title: 'Observacion',
                width: '14%',
                align: 'left'
            },
            {
                name: 'actions',
                title: '',
                getCellValue: (row: any) => row,
                width: '12%',
                align: 'center',
                hiddenFilterColumn: true

            }
        ],
        []
    );

    return columns;
};
