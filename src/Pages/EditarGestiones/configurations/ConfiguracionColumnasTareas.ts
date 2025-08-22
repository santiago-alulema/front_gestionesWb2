import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasTareas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedula',
                title: 'Cedula',
                width: '14%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Deudor',
                width: '16%',
                align: 'left'
            },
            {
                name: 'fechaCompromiso',
                title: 'Fecha Recordatorio',
                width: '14%',
                align: 'center'
            },
            {
                name: 'montoComprometido',
                title: 'Valor',
                width: '14%',
                align: 'left'
            },
            {
                name: 'tipoTarea',
                title: 'Tipo Tarea',
                width: '14%',
                align: 'left'
            },
            {
                name: 'observaciones',
                title: 'Observacion',
                width: '14%',
                align: 'left'
            },
            {
                name: 'actions',
                title: '',
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
