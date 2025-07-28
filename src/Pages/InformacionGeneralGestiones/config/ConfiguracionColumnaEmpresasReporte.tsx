import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnaEmpresasReporte = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'empresa',
                title: 'Empresa',
                width: '15%',
                align: 'center'
            },
            {
                name: 'cantidadGestiones',
                title: 'Gestiones',
                width: '10%',
                align: 'left'
            },
            {
                name: 'cantidadPagos',
                title: 'Pagos',
                width: '15%',
                align: 'left'
            },
            {
                name: 'compromisoPagos',
                title: 'Compromisos',
                width: '15%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
