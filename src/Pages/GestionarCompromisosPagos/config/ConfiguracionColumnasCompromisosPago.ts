import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasCompromisosPago = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedulaCliente',
                title: 'Cedula',
                width: '10%',
                align: 'center'
            },
            {
                name: 'nombreCliente',
                title: 'Cliente',
                width: '15%',
                align: 'left'
            },
            {
                name: 'numeroFactura',
                title: 'º Factura',
                width: '10%',
                align: 'left'
            },
            {
                name: 'tipoTarea',
                title: 'Tipo Tarea',
                width: '15%',
                align: 'left'
            },
            {
                name: 'horaTarea',
                title: 'Hora Tarea',
                width: '12%',
                align: 'left'
            },
            {
                name: 'diasMora',
                title: 'Dias Mora',
                width: '8%',
                align: 'left'
            },
            {
                name: 'valorCuota',
                title: 'Valor Cuota',
                width: '10%',
                align: 'left'
            },
            {
                name: 'numeroCouta',
                title: 'º Cuota',
                width: '10%',
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
