import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigurarColimnasMovimientoDeudas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'tipo',
                title: 'Tipo Movimiento',
                width: '15%',
                align: 'center'
            },
            {
                name: 'fecha',
                title: 'Fecha Movimiento',
                width: '15%',
                align: 'center'
            },
            {
                name: 'observaciones',
                title: 'Observaciones',
                width: '20%',
                align: 'center'
            },
            {
                name: 'tracking',
                title: 'Tracking',
                width: '50%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
