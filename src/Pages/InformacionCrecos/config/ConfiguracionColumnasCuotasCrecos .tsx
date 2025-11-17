import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasCuotasCrecos = () => {
    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'codOperacion',
                title: 'Operación',
                width: '12%',
                align: 'left'
            },
            {
                name: 'codCuota',
                title: 'Cod. Cuota',
                width: '12%',
                align: 'left'
            },
            {
                name: 'numeroCuota',
                title: 'Cuota',
                width: '8%',
                align: 'center'
            },
            {
                name: 'fechaUltimoPago',
                title: 'Último Pago',
                width: '12%',
                align: 'center'
            },
            {
                name: 'codEstadoCuota',
                title: 'Estado Cuota',
                width: '10%',
                align: 'center'
            },
            {
                name: 'descEstadoOperacion',
                title: 'Estado Operación',
                width: '15%',
                align: 'left'
            },
            {
                name: 'codEstadoRegistro',
                title: 'Estado Registro',
                width: '10%',
                align: 'center'
            },
            {
                name: 'desEstadoRegistro',
                title: 'Descripción Estado',
                width: '15%',
                align: 'left'
            },
            {
                name: 'iValorTotalCuota',
                title: 'Valor Total Cuota',
                width: '12%',
                align: 'right'
            },
            {
                name: 'iValorCuota',
                title: 'Valor Cuota',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valorCapitalInteres',
                title: 'Capital + Interés',
                width: '12%',
                align: 'right'
            },
            {
                name: 'valorCargos',
                title: 'Cargos',
                width: '10%',
                align: 'right'
            },
            {
                name: 'valorOtrosCargos',
                title: 'Otros Cargos',
                width: '12%',
                align: 'right'
            }
        ],
        []
    );

    return columns;
};
