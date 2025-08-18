import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigurarColumnasDeudas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'numeroFactura',
                title: 'Numero Factura',
                width: '10%',
                align: 'center'
            },
            {
                name: 'saldoDeuda',
                title: 'Saldo Deuda',
                width: '10%',
                align: 'center'
            },

            {
                name: 'montoCobrar',
                title: 'Monto Cobrar',
                width: '15%',
                align: 'center'
            },
            {
                name: 'creditos',
                title: 'Creditos',
                width: '10%',
                align: 'center'
            },
            {
                name: 'numeroCuotas',
                title: 'Numero Cuotas',
                width: '10%',
                align: 'center'
            },
            {
                name: 'diasMora',
                title: 'Dias Mora',
                width: '10%',
                align: 'left'
            },
            {
                name: 'tramo',
                title: 'Tramo',
                width: '10%',
                align: 'left'
            },
            {
                name: 'empresa',
                title: 'Empresa',
                width: '10%',
                align: 'center'
            },
            {
                name: 'actions',
                title: 'Acciones',
                getCellValue: (row: any) => row,
                width: '15%',
                align: 'center',
                hiddenFilterColumn: true

            }
        ],
        []
    );

    return columns;
};
