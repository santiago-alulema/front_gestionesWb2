import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasGestiones = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'cedula',
                title: 'Cedula',
                width: '9%',
                align: 'center'
            },
            {
                name: 'nombre',
                title: 'Deudor',
                width: '13%',
                align: 'left'
            },
            {
                name: 'fechaGestion',
                title: 'Fecha Gestion',
                width: '8%',
                align: 'left'
            },
            {
                name: 'tipoResultado',
                title: 'Resultado',
                width: '12%',
                align: 'left'
            },
            {
                name: 'tipoContactoResultado',
                title: 'Tipo Contacto',
                width: '12%',
                align: 'left'
            },
            {
                name: 'respuestaTipoContacto',
                title: 'Respuesta',
                width: '12%',
                align: 'left'
            },
            // {
            //     name: 'email',
            //     title: 'email',
            //     width: '9%',
            //     align: 'left'
            // },
            {
                name: 'descripcion',
                title: 'Observacion',
                width: '14%',
                align: 'left'
            },
            {
                name: 'usuarioGestiona',
                title: 'Gestor',
                width: '12%',
                align: 'left'
            },
            {
                name: 'actions',
                title: '',
                getCellValue: (row: any) => row,
                width: '8%',
                align: 'center',
                hiddenFilterColumn: true

            }
        ],
        []
    );

    return columns;
};
