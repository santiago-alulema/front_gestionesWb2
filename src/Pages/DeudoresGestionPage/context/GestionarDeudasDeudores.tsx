import React, { createContext, useContext, useState, useEffect } from 'react';
import ClientInfo from '@/model/Dtos/In/ClientInfo';
import DeudasInDTO from '@/model/Dtos/In/DeudasInDTO';
import TelefonosClientesActivos from '@/model/Dtos/In/TelefonosClientesActivos';
import TipoGestioneOutDTO from '@/model/Dtos/In/TipoGestioneOutDTO';
import { telefonosActivosClientes, tipoGestionHijosPorPadreId } from '@/services/Service';
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
    grabarPago: PagoGrabarOutDTO;

    // Estados UI
    abrirModalGestionarDeuda: boolean;
    abrirModalInformacionDeuda: boolean;

    // Nuevos estados para filtrado
    empresaSeleccionada: string;
    sinGestionar: boolean;

    // Setters tipados correctamente
    setDeudaSeleccionada: React.Dispatch<React.SetStateAction<DebstByClientInfoInDTO | null>>;
    setDeudorSeleccionado: React.Dispatch<React.SetStateAction<ClientInfo | null>>;
    setGestionHijo: React.Dispatch<React.SetStateAction<TipoGestioneOutDTO[]>>;
    setGrabarGestion: React.Dispatch<React.SetStateAction<IGestionInDTO | null>>;
    setGrabarCompromiso: React.Dispatch<React.SetStateAction<ICompromisoPagoOutDTO | null>>;
    setGrabarPago: React.Dispatch<React.SetStateAction<PagoGrabarOutDTO>>;
    setAbrirModalGestionarDeuda: React.Dispatch<React.SetStateAction<boolean>>;
    setAbrirModalInformacionDeuda: React.Dispatch<React.SetStateAction<boolean>>;
    setEmpresaSeleccionada: React.Dispatch<React.SetStateAction<string>>;
    setSinGestionar: React.Dispatch<React.SetStateAction<boolean>>;
    setTelefonosActivos: React.Dispatch<React.SetStateAction<TelefonosClientesActivos[]>>;

    // Métodos
    obtenerTelefonosCliente: (cedulaCliente: string) => Promise<void>;
    LlenarGestionesHijo: (gestionPadreId: string) => Promise<void>;
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
    const [abrirModalGestionarDeuda, setAbrirModalGestionarDeuda] = useState<boolean>(false);

    const [abrirModalInformacionDeuda, setAbrirModalInformacionDeuda] = useState<boolean>(false);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<string>("TODOS");
    const [sinGestionar, setSinGestionar] = useState(false);

    // Estados de grabación
    const [grabarGestion, setGrabarGestion] = useState<IGestionInDTO>();
    const [grabarCompromiso, setGrabarCompromiso] = useState<ICompromisoPagoOutDTO | null>(null);
    const [grabarPago, setGrabarPago] = useState<PagoGrabarOutDTO>({
        idDeuda: '',
        fechaPago: '',
        montoPagado: 0,
        medioPago: '',
        observaciones: '',
        numeroDocumento: '',
        bancoId: '',
        cuentaId: '',
        tipoTransaccionId: '',
        abonoLiquidacionId: ''
    });

    const obtenerTelefonosCliente = async (cedulaCliente: string) => {
        const telefonosRespuesta = await telefonosActivosClientes(cedulaCliente);
        setTelefonosActivos(telefonosRespuesta);
    };


    const LlenarGestionesHijo = async (gestionPadreId: string) => {
        if (!gestionPadreId) return setGestionHijo([]);
        const hijos = await tipoGestionHijosPorPadreId(gestionPadreId);
        setGestionHijo(hijos);
    };

    useEffect(() => {
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
                abrirModalGestionarDeuda,

                // Setters
                setDeudaSeleccionada,
                setDeudorSeleccionado,
                setGestionHijo,
                setGrabarGestion,
                setGrabarCompromiso,
                setGrabarPago,
                setTelefonosActivos,
                setAbrirModalGestionarDeuda,

                // Métodos
                obtenerTelefonosCliente,
                LlenarGestionesHijo,

                abrirModalInformacionDeuda,
                setAbrirModalInformacionDeuda,
                setEmpresaSeleccionada,
                setSinGestionar,
                empresaSeleccionada,
                sinGestionar,
            }}
        >
            {children}
        </GestionarDeudasDeudoresContext.Provider>
    );
};