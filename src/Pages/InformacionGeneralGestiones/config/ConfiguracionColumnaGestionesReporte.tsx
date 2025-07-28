import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnaGestionesReporte = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'nombreUsuario',
                title: 'Gestor',
                width: '48%',
                align: 'center'
            },
            {
                name: 'valorTotal',
                title: 'Valor',
                width: '20%',
                align: 'left'
            },
            {
                name: 'CantidadGestiones',
                title: 'Cantidad',
                width: '20%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
