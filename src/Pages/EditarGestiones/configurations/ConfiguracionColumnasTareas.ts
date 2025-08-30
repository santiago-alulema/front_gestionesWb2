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
                width: '9%',
                align: 'center'
            },
            {
                name: 'montoComprometidoString',
                title: 'Valor',
                width: '8%',
                align: 'right'
            },
            {
                name: 'tipoTarea',
                title: 'Tipo Tarea',
                width: '10%',
                align: 'left'
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
                name: 'gestor',
                title: 'Gestor',
                width: '10%',
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
