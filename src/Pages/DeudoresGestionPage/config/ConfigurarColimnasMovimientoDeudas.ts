import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigurarColimnasMovimientoDeudas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'tipo',
                title: 'Tipo Movimiento',
                width: '30%',
                align: 'center'
            },
            {
                name: 'fecha',
                title: 'Fecha Movimiento',
                width: '30%',
                align: 'center'
            },
            {
                name: 'observaciones',
                title: 'Observaciones',
                width: '40%',
                align: 'center'
            }
        ],
        []
    );

    return columns;
};
