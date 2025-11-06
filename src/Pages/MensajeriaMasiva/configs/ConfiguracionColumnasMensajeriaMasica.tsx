import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasMensajeriaMasica = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'idDeudor',
                title: 'Cedula',
                width: '20%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Cliente',
                width: '20%',
                align: 'left'
            },
            {
                name: 'numeroFactura',
                title: 'º Factura',
                width: '20%',
                align: 'left'
            }
            ,
            {
                name: 'telefono',
                title: 'Telefono',
                width: '20%',
                align: 'left'
            },
            {
                name: 'email',
                title: 'correo',
                width: '20%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
