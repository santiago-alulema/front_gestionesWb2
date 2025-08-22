import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguraracionColumnasPagos = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedula',
                title: 'Cedula',
                width: '10%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Deudor',
                width: '10%',
                align: 'left'
            },
            {
                name: 'fechaPago',
                title: 'Fecha',
                width: '10%',
                align: 'center'
            },
            {
                name: 'banco',
                title: 'Banco',
                width: '10%',
                align: 'left'
            },
            {
                name: 'cuenta',
                title: 'Cuenta',
                width: '10%',
                align: 'left'
            },
            {
                name: 'tipoTransaccion',
                title: 'Tipo Transaccion',
                width: '10%',
                align: 'left'
            },
            {
                name: 'abonoLiquidacion',
                title: 'Abono/Liquidacion',
                width: '10%',
                align: 'left'
            },
            {
                name: 'numeroDocumenro',
                title: 'Numero Documento',
                width: '10%',
                align: 'left'
            },
            {
                name: 'observaciones',
                title: 'Observacion',
                width: '10%',
                align: 'left'
            },
            {
                name: 'actions',
                title: '',
                getCellValue: (row: any) => row,
                width: '10%',
                align: 'center',
                hiddenFilterColumn: true

            }
        ],
        []
    );

    return columns;
};
