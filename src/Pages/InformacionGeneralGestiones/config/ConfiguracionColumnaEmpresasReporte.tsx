import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnaReporteEmpresa = () => {
    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'empresa',
                title: 'Empresa',
                width: '20%',
                align: 'left'
            },
            {
                name: 'cantidadGestiones',
                title: 'Gestiones',
                width: '15%',
                align: 'center'
            },
            {
                name: 'cantidadCompromisosPago',
                title: 'Compromisos',
                width: '12%',
                align: 'center'
            },
            {
                name: 'cantidadPagos',
                title: 'Pagos',
                width: '12%',
                align: 'center'
            },
            {
                name: 'valorTotalPagos',
                title: 'Valor Pagos',
                width: '15%',
                align: 'right',
                getCellValue: (row: any) =>
                    new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP'
                    }).format(row.valorTotalPagos)
            },
            {
                name: 'valorTotalCompromisos',
                title: 'Valor Compromisos',
                width: '14%',
                align: 'right',
                getCellValue: (row: any) =>
                    new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP'
                    }).format(row.valorTotalCompromisos)
            }
        ],
        []
    );

    return columns;
};