import { Column } from '@devexpress/dx-react-grid';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const ConfigurarColimnasMovimientoDeudas = () => {

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'tipo',
                title: 'Tipo Movimiento',
                width: '17%',
                align: 'center'
            },
            {
                name: 'fecha_formateada',
                title: 'Fecha Movimiento',
                width: '15%',
                align: 'center',
                getCellValue: (row) =>
                    row.fecha_formateada
                        ? dayjs.utc(row.fecha_formateada).format("YYYY-MM-DD (HH:mm:ss)")
                        : ""
            },
            {
                name: 'observaciones',
                title: 'Observaciones',
                width: '23%',
                align: 'center'
            },
            {
                name: 'tracking',
                title: 'Tracking',
                width: '45%',
                align: 'left'
            }
        ],
        []
    );

    return columns;
};
