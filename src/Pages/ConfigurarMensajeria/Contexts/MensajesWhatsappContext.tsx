// src/Pages/MensajesWhatsapp/Contexts/MensajesWhatsappContext.tsx
import { MensajeWhatsappInOut } from "@/Pages/ConfigurarMensajeria/models/InOut/MensajeWhatsappInOut";
import { obtenerMensajesWhatsappServicioWeb } from "@/Pages/ConfigurarMensajeria/services/MensajesWhatsappServiciosWeb";
import { createContext, useContext, useMemo, useState } from "react";

interface Ctx {
    mensajes: MensajeWhatsappInOut[];
    setMensajes: (x: MensajeWhatsappInOut[]) => void;

    abrirModal: boolean;
    setAbrirModal: (v: boolean) => void;

    esEditar: boolean;
    setEsEditar: (v: boolean) => void;

    seleccionado: MensajeWhatsappInOut | null;
    setSeleccionado: (x: MensajeWhatsappInOut | null) => void;

    filtroTexto: string;
    setFiltroTexto: (x: string) => void;

    filtroTipo: string;
    setFiltroTipo: (x: string) => void;

    obtenerMensajes: () => Promise<void>;
}

const MensajesWhatsappContext = createContext<Ctx>({} as Ctx);

export const MensajesWhatsappProvider = ({ children }: { children: React.ReactNode }) => {
    const [mensajes, setMensajes] = useState<MensajeWhatsappInOut[]>([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [esEditar, setEsEditar] = useState(false);
    const [seleccionado, setSeleccionado] = useState<MensajeWhatsappInOut | null>(null);

    const [filtroTexto, setFiltroTexto] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");

    const obtenerMensajes = async () => {
        const data = await obtenerMensajesWhatsappServicioWeb(filtroTexto, filtroTipo);
        setMensajes(data);
    };

    const value = useMemo(
        () => ({
            mensajes,
            setMensajes,
            abrirModal,
            setAbrirModal,
            esEditar,
            setEsEditar,
            seleccionado,
            setSeleccionado,
            filtroTexto,
            setFiltroTexto,
            filtroTipo,
            setFiltroTipo,
            obtenerMensajes,
        }),
        [mensajes, abrirModal, esEditar, seleccionado, filtroTexto, filtroTipo]
    );

    return (
        <MensajesWhatsappContext.Provider value={value}>
            {children}
        </MensajesWhatsappContext.Provider>
    );
};

export const useMensajesWhatsapp = () => useContext(MensajesWhatsappContext);
