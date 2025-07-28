import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnaCompromisosPagoReporte = () => {

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
                name: 'cantidadCompromisos',
                title: 'Cantidad',
                width: '20%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
