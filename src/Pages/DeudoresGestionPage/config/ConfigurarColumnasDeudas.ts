import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigurarColumnasDeudas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'saldoDeuda',
                title: 'Saldo Deuda',
                width: '10%',
                align: 'center'
            },
            {
                name: 'descuento',
                title: 'Descuento',
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
                name: 'fechaVenta',
                title: 'Fecha Venta',
                width: '10%',
                align: 'center'
            },
            {
                name: 'fechaUltimoPago',
                title: 'Fecha Ultimo Pago',
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
                name: 'estado',
                title: 'Estado',
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
