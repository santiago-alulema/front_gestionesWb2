import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigurarColumnasDeudas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'numeroFactura',
                title: 'Numero Factura',
                width: '15%',
                align: 'left',
                alignHeader: 'center'
            },
            {
                name: 'saldoDeuda',
                title: 'Saldo Deuda',
                width: '9%',
                align: 'center',
                alignHeader: 'center'

            },

            {
                name: 'montoCobrar',
                title: 'Monto Cobrar',
                width: '12%',
                align: 'center',
                alignHeader: 'center'
            },
            {
                name: 'creditos',
                title: 'Creditos',
                width: '8%',
                align: 'center',
                alignHeader: 'center'
            },
            {
                name: 'numeroCuotas',
                title: 'Numero Cuotas',
                width: '8%',
                align: 'center',
                alignHeader: 'center'
            },
            {
                name: 'diasMora',
                title: 'Dias Mora',
                width: '7%',
                align: 'left',
                alignHeader: 'center'
            },
            {
                name: 'tramo',
                title: 'Tramo',
                width: '10%',
                align: 'left',
                alignHeader: 'center'
            },
            {
                name: 'empresa',
                title: 'Empresa',
                width: '15%',
                align: 'center',
                alignHeader: 'center'
            },
            {
                name: 'actions',
                title: 'Acciones',
                getCellValue: (row: any) => row,
                width: '16%',
                align: 'center',
                hiddenFilterColumn: true,
                alignHeader: 'center'

            }
        ],
        []
    );

    return columns;
};
