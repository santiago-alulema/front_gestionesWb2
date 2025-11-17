import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnasCarteraCrecos = () => {
    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'coD_EMPRESA',
                title: 'Cod. Empresa',
                width: '8%',
                align: 'center'
            },
            {
                name: 'empresa',
                title: 'Empresa',
                width: '12%',
                align: 'left'
            },
            {
                name: 'coD_UNIDAD_NEGOCIO',
                title: 'Cod. U. Negocio',
                width: '10%',
                align: 'center'
            },
            {
                name: 'unidaD_NEGOCIO',
                title: 'Unidad Negocio',
                width: '12%',
                align: 'left'
            },
            {
                name: 'coD_TIPO_CARTERA',
                title: 'Cod. Tipo Cartera',
                width: '10%',
                align: 'center'
            },
            {
                name: 'tipO_CARTERA',
                title: 'Tipo Cartera',
                width: '14%',
                align: 'left'
            },
            {
                name: 'imes',
                title: 'Mes',
                width: '6%',
                align: 'center'
            },
            {
                name: 'iano',
                title: 'Año',
                width: '6%',
                align: 'center'
            },
            {
                name: 'cnumeroidentificacion',
                title: 'Identificación',
                width: '12%',
                align: 'center'
            },
            {
                name: 'cnombrecompleto',
                title: 'Cliente',
                width: '18%',
                align: 'left'
            },
            {
                name: 'coD_TIPO_GESTOR',
                title: 'Cod. Tipo Gestor',
                width: '10%',
                align: 'center'
            },
            {
                name: 'cdescripcion',
                title: 'Descripción Gestor',
                width: '14%',
                align: 'left'
            },
            {
                name: 'bcuotaimpaga',
                title: '¿Cuota Impaga?',
                width: '10%',
                align: 'center'
            },
            {
                name: 'diaS_MORA',
                title: 'Días Mora',
                width: '8%',
                align: 'center'
            },
            {
                name: 'dfechavencimiento',
                title: 'Fecha Vencimiento',
                width: '12%',
                align: 'center'
            },
            {
                name: 'ivalordeudatotal',
                title: 'Deuda Total',
                width: '10%',
                align: 'right'
            },
            {
                name: 'iciclocorte',
                title: 'Ciclo Corte',
                width: '8%',
                align: 'center'
            },
            {
                name: 'coD_PAIS',
                title: 'Cod. País',
                width: '8%',
                align: 'center'
            },
            {
                name: 'pais',
                title: 'País',
                width: '10%',
                align: 'left'
            },
            {
                name: 'coD_PROVINCIA',
                title: 'Cod. Provincia',
                width: '10%',
                align: 'center'
            },
            {
                name: 'provincia',
                title: 'Provincia',
                width: '12%',
                align: 'left'
            },
            {
                name: 'coD_CANTON',
                title: 'Cod. Cantón',
                width: '10%',
                align: 'center'
            },
            {
                name: 'canton',
                title: 'Cantón',
                width: '12%',
                align: 'left'
            },
            {
                name: 'coD_ZONA',
                title: 'Cod. Zona',
                width: '8%',
                align: 'center'
            },
            {
                name: 'zona',
                title: 'Zona',
                width: '10%',
                align: 'left'
            },
            {
                name: 'coD_BARRIO',
                title: 'Cod. Barrio',
                width: '10%',
                align: 'center'
            },
            {
                name: 'barrio',
                title: 'Barrio',
                width: '14%',
                align: 'left'
            },
            {
                name: 'coD_GESTOR',
                title: 'Cod. Gestor',
                width: '10%',
                align: 'center'
            },
            {
                name: 'gestor',
                title: 'Gestor',
                width: '12%',
                align: 'left'
            },
            {
                name: 'codigocliente',
                title: 'Cod. Cliente',
                width: '10%',
                align: 'center'
            }
        ],
        []
    );

    return columns;
};
