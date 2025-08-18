import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnaPagosReporte = () => {

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
                name: 'cantidadPagos',
                title: 'Cantidad',
                width: '20%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
