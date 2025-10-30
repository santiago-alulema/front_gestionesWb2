import { Column } from '@devexpress/dx-react-grid';
import { Chip } from '@mui/material';
import { useMemo } from 'react';

export const ConfigurarColumnasWhatsapp = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'user',
                title: 'Usuario',
                width: '20%',
                align: 'center'
            },
            {
                name: 'readyString',
                title: 'ready',
                width: '15%',
                align: 'left',

            },
            {
                name: 'existsOnNodeString',
                title: 'existsOnNode',
                width: '20%',
                align: 'left',

            },
            {
                name: 'lastReason',
                title: 'lastReason',
                width: '20%',
                align: 'left'
            },
            {
                name: 'actions',
                title: '',
                getCellValue: (row: any) => row,
                width: '25%',
                align: 'center',
                hiddenFilterColumn: true
            }
        ],
        []
    );

    return columns;
};
