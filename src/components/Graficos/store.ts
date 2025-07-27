// store.ts
import { create } from 'zustand';

interface Telefonos {
    activos: number;
    inactivos: number;
}

interface CompromisosResumen {
    activos: number;
    cumplidos: number;
}

interface DeudaPorMes {
    mes: string;
    monto: number;
}

interface GestionPorDia {
    fecha: string;
    cantidad: number;
}

interface DashboardData {
    totalDeudas: number;
    totalGestiones: number;
    totalCompromisos: number;
    totalTelefonos: Telefonos;
    montoPorRecuperar: number;
    compromisosResumen: CompromisosResumen;
    deudasPorMes: DeudaPorMes[];
    gestionesPorDia: GestionPorDia[];
}

interface DashboardStore {
    data: DashboardData;
}

// Datos de prueba
const mockData: DashboardData = {
    totalDeudas: 1245,
    totalGestiones: 843,
    totalCompromisos: 327,
    totalTelefonos: {
        activos: 892,
        inactivos: 153,
    },
    montoPorRecuperar: 125430.75,
    compromisosResumen: {
        activos: 245,
        cumplidos: 82,
    },
    deudasPorMes: [
        { mes: 'Ene', monto: 12500 },
        { mes: 'Feb', monto: 18900 },
        { mes: 'Mar', monto: 14200 },
        { mes: 'Abr', monto: 21000 },
        { mes: 'May', monto: 18500 },
        { mes: 'Jun', monto: 23400 },
        { mes: 'Jul', monto: 19800 },
    ],
    gestionesPorDia: [
        { fecha: '01/07', cantidad: 42 },
        { fecha: '02/07', cantidad: 35 },
        { fecha: '03/07', cantidad: 58 },
        { fecha: '04/07', cantidad: 47 },
        { fecha: '05/07', cantidad: 62 },
        { fecha: '06/07', cantidad: 55 },
        { fecha: '07/07', cantidad: 38 },
    ],
};

export const useDashboardStore = create<DashboardStore>(() => ({
    data: mockData,
}));