import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasCompromisosPago = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedulaCliente',
                title: 'Cedula',
                width: '15%',
                align: 'center'
            },
            {
                name: 'numeroFactura',
                title: 'º Factura',
                width: '10%',
                align: 'left'
            },
            {
                name: 'nombreCliente',
                title: 'Deudor',
                width: '15%',
                align: 'left'
            },
            {
                name: 'fechaCompromiso',
                title: 'Fecha Compromiso',
                width: '15%',
                align: 'left'
            },
            {
                name: 'montoCompromiso',
                title: 'Monto Compromiso',
                width: '10%',
                align: 'left'
            },
            {
                name: 'valorCuotas',
                title: 'Valor Cuota',
                width: '10%',
                align: 'left'
            },
            {
                name: 'numeroCouta',
                title: 'º Cuota',
                width: '15%',
                align: 'center'
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
