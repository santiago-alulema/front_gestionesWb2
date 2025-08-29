import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasTareas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedula',
                title: 'Cedula',
                width: '11%',
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
                width: '11%',
                align: 'center'
            },
            {
                name: 'montoComprometidoString',
                title: 'Valor',
                width: '10%',
                align: 'right'
            },
            {
                name: 'tipoTarea',
                title: 'Tipo Tarea',
                width: '14%',
                align: 'center'
            },
            {
                name: 'observaciones',
                title: 'Observacion',
                width: '14%',
                align: 'left'
            },
            {
                name: 'fechaRegistroString',
                title: 'Fecha Registro',
                width: '10%',
                align: 'center'
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
