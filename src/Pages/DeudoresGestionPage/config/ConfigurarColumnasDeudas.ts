import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigurarColumnasDeudas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'montoOriginal',
                title: 'Monto Original',
                width: '10%',
                align: 'center'
            },
            {
                name: 'saldoActual',
                title: 'Saldo Actual',
                width: '10%',
                align: 'center'
            },
            {
                name: 'numeroFactura',
                title: 'º Factura',
                width: '15%',
                align: 'center'
            },
            {
                name: 'numeroCouta',
                title: 'º Cuota',
                width: '10%',
                align: 'center'
            },
            {
                name: 'valorCuotas',
                title: 'Valor Couta',
                width: '10%',
                align: 'center'
            },
            {
                name: 'fechaVencimiento',
                title: 'Fecha Vencimiento',
                width: '15%',
                align: 'left'
            },
            {
                name: 'fechaAsignacion',
                title: 'Fecha Asignacion',
                width: '15%',
                align: 'left'
            },
            // {
            //     name: 'descripcion',
            //     title: 'Descripcion',
            //     width: '15%',
            //     align: 'center'
            // },
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
