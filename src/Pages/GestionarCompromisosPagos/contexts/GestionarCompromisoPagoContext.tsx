import DeudasInDTO from '@/model/Dtos/In/DeudasInDTO';
import { compromisoPagoServiceWeb } from '@/services/Service';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GestionarCompromisoPagoContextProps {
    compromisoPagoSeleccionado?: DeudasInDTO;
    setCompromisoPagoSeleccionado: React.Dispatch<React.SetStateAction<DeudasInDTO | undefined>>;

    compromisosPago: DeudasInDTO[];
    setCompromisosPago: React.Dispatch<React.SetStateAction<DeudasInDTO[]>>;

    cargarCompromisos: () => {};

    abrirModalGestionarCompromiso: boolean;
    setAbrirModalGestionarCompromiso: React.Dispatch<React.SetStateAction<boolean>>;
}

const GestionarCompromisoPagoContext = createContext<GestionarCompromisoPagoContextProps | undefined>(undefined);

export const GestionarCompromisoPagoProvider = ({ children }: { children: ReactNode }) => {
    const [compromisoPagoSeleccionado, setCompromisoPagoSeleccionado] = useState<DeudasInDTO>();
    const [compromisosPago, setCompromisosPago] = useState<DeudasInDTO[]>([]);
    const [abrirModalGestionarCompromiso, setAbrirModalGestionarCompromiso] = useState(false)

    const cargarCompromisos = async () => {
        const respuesta = await compromisoPagoServiceWeb(true);
        setCompromisosPago(respuesta);
    }

    return (
        <GestionarCompromisoPagoContext.Provider value={{
            compromisoPagoSeleccionado,
            setCompromisoPagoSeleccionado,
            compromisosPago,
            setCompromisosPago,
            cargarCompromisos,
            setAbrirModalGestionarCompromiso,
            abrirModalGestionarCompromiso
        }}>
            {children}
        </GestionarCompromisoPagoContext.Provider>
    );
};

// 4️⃣ Hook para usar el contexto
export const useGestionarCompromisoPago = () => {
    const context = useContext(GestionarCompromisoPagoContext);
    if (!context) {
        throw new Error('useGestionarCompromisoPago debe usarse dentro de un GestionarCompromisoPagoProvider');
    }
    return context;
};
