import React, { createContext, useContext, useState, useEffect } from 'react';
import ClientInfo from '@/model/Dtos/In/ClientInfo';
import DeudasInDTO from '@/model/Dtos/In/DeudasInDTO';
import TelefonosClientesActivos from '@/model/Dtos/In/TelefonosClientesActivos';
import TipoGestioneOutDTO from '@/model/Dtos/In/TipoGestioneOutDTO';
import { telefonosActivosClientes, tipoGestionHijosPorPadreId, tipoGestionPadre } from '@/services/Service';
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { ICompromisoPagoOutDTO } from '@/model/Dtos/Out/ICompromisoPagoOutDTO';
import { PagoGrabarOutDTO } from '@/model/Dtos/Out/PagoGrabarOutDTO';

interface IGestionarDeudasContext {
    // Estados existentes
    gestionesPadre: TipoGestioneOutDTO[];
    gestionHijo: TipoGestioneOutDTO[];
    telefonosActivos: TelefonosClientesActivos[];
    deudorSeleccionado: ClientInfo | null;
    deudaSeleccionada: DebstByClientInfoInDTO | null;

    // Estados de grabación
    grabarGestion: IGestionInDTO | null;
    grabarCompromiso: ICompromisoPagoOutDTO | null;
    grabarPago: PagoGrabarOutDTO | null;

    // Setters existentes
    setDeudaSeleccionada: (cliente: DebstByClientInfoInDTO | null) => void;
    setDeudorSeleccionado: (cliente: ClientInfo | null) => void;
    setGestionHijo: (cliente: TipoGestioneOutDTO[] | []) => void;

    // Setters para estados de grabación
    setGrabarGestion: (gestion: IGestionInDTO | null) => void;
    setGrabarCompromiso: (compromiso: ICompromisoPagoOutDTO | null) => void;
    setGrabarPago: (pago: PagoGrabarOutDTO | null) => void;

    // Métodos
    obtenerTelefonosCliente: (cedulaCliente: string) => Promise<void>;
    LlenarGestionesHijo: (gestionPadreId: string) => Promise<void>;
    setTelefonosActivos: (telefonos: TelefonosClientesActivos[]) => void;
}

const GestionarDeudasDeudoresContext = createContext<IGestionarDeudasContext | null>(null);

export const useGestionarDeudas = () => {
    const context = useContext(GestionarDeudasDeudoresContext);
    if (!context) {
        throw new Error('useGestionarDeudas debe usarse dentro de un GestionarDeudasProvider');
    }
    return context;
};

export const GestionarDeudasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Estados existentes
    const [gestionesPadre, setGestionesPadre] = useState<TipoGestioneOutDTO[]>([]);
    const [gestionHijo, setGestionHijo] = useState<TipoGestioneOutDTO[]>([]);
    const [telefonosActivos, setTelefonosActivos] = useState<TelefonosClientesActivos[]>([]);
    const [deudorSeleccionado, setDeudorSeleccionado] = useState<ClientInfo | null>(null);
    const [deudaSeleccionada, setDeudaSeleccionada] = useState<DebstByClientInfoInDTO | null>(null);

    // Estados de grabación
    const [grabarGestion, setGrabarGestion] = useState<IGestionInDTO>({
        idDeuda: '',
        idTipoGestion: '',
        descripcion: '',
        idTipoContactoDeudor: ''
    });
    const [grabarCompromiso, setGrabarCompromiso] = useState<ICompromisoPagoOutDTO | null>(null);
    const [grabarPago, setGrabarPago] = useState<PagoGrabarOutDTO | null>(null);

    const obtenerTelefonosCliente = async (cedulaCliente: string) => {
        const telefonosRespuesta = await telefonosActivosClientes(cedulaCliente);
        setTelefonosActivos(telefonosRespuesta);
    };

    const llenarGestionesPadre = async () => {
        const respuesta = await tipoGestionPadre();
        setGestionesPadre(respuesta);
    };

    const LlenarGestionesHijo = async (gestionPadreId: string) => {
        if (!gestionPadreId) return setGestionHijo([]);
        const hijos = await tipoGestionHijosPorPadreId(gestionPadreId);
        setGestionHijo(hijos);
    };

    useEffect(() => {
        llenarGestionesPadre();
    }, []);

    return (
        <GestionarDeudasDeudoresContext.Provider
            value={{
                // Estados
                gestionesPadre,
                gestionHijo,
                telefonosActivos,
                deudorSeleccionado,
                deudaSeleccionada,
                grabarGestion,
                grabarCompromiso,
                grabarPago,

                // Setters
                setDeudaSeleccionada,
                setDeudorSeleccionado,
                setGestionHijo,
                setGrabarGestion,
                setGrabarCompromiso,
                setGrabarPago,
                setTelefonosActivos,

                // Métodos
                obtenerTelefonosCliente,
                LlenarGestionesHijo
            }}
        >
            {children}
        </GestionarDeudasDeudoresContext.Provider>
    );
};