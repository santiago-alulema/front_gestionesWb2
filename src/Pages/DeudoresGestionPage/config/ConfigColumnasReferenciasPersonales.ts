import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigColumnasReferenciasPersonales = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'nombre',
                title: 'Nombre',
                width: '31%',
                align: 'center'
            },
            {
                name: 'provincia',
                title: 'Provincia',
                width: '17%',
                align: 'center'
            },
            {
                name: 'canton',
                title: 'Canton',
                width: '17%',
                align: 'center'
            },
            {
                name: 'vinculo',
                title: 'Vinculo',
                width: '20%',
                align: 'left'
            },
            {
                name: 'telefono',
                title: 'Telefono',
                width: '15%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
