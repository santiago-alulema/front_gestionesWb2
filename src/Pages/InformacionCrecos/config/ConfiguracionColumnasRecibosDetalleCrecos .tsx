import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasRecibosDetalleCrecos = () => {
    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'iReciboDetalle',
                title: 'ID Detalle',
                width: '15%',
                align: 'center'
            },
            {
                name: 'codRecibo',
                title: 'Recibo',
                width: '12%',
                align: 'left'
            },
            {
                name: 'iCodigoOperacion',
                title: 'Operación',
                width: '15%',
                align: 'left'
            },
            {
                name: 'numCuota',
                title: 'Cuota',
                width: '10%',
                align: 'center'
            },
            {
                name: 'nombreArchivo',
                title: 'Archivo',
                width: '18%',
                align: 'left'
            },
            {
                name: 'codRubro',
                title: 'Rubro',
                width: '10%',
                align: 'center'
            },
            {
                name: 'cDescripcionRubro',
                title: 'Descripción Rubro',
                width: '20%',
                align: 'left'
            },
            {
                name: 'valorRecibo',
                title: 'Valor',
                width: '10%',
                align: 'right'
            }
        ],
        []
    );

    return columns;
};
