import { useLoading } from "@/components/LoadingContext";
import { GestionDto } from "@/Pages/EditarGestiones/models/GestionDto";
import { PagoDto } from "@/Pages/EditarGestiones/models/PagoDto";
import { TareaDto } from "@/Pages/EditarGestiones/models/TareaDto";
import { obtenerPagosServicioWeb, obtenerTareasServicioWeb } from "@/Pages/EditarGestiones/services/ServiciosWebEditarGestiones";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface EditarGestionesContextProps {
    abrirModalEditarGestiones: boolean;
    setAbrirModalEditarGestiones: React.Dispatch<React.SetStateAction<boolean>>;
    abrirModalEditarPagos: boolean;
    setAbrirModalEditarPagos: React.Dispatch<React.SetStateAction<boolean>>;
    abrirModalEditarTareas: boolean;
    setAbrirModalEditarTareas: React.Dispatch<React.SetStateAction<boolean>>;
    pagosSeleccionadoEditar: PagoDto | null;
    setPagosSeleccionadoEditar: React.Dispatch<React.SetStateAction<PagoDto | null>>;

    pagosAEditar: PagoDto[] | null;
    setPagosAEditar: React.Dispatch<React.SetStateAction<PagoDto[] | null>>;

    gestionesAEditar: GestionDto[] | null;
    setGestionesAEditar: React.Dispatch<React.SetStateAction<GestionDto[] | null>>;
    gestionSeleccionada: GestionDto | null;
    setgestionSeleccionada: React.Dispatch<React.SetStateAction<GestionDto | null>>;

    tareasAEditar: TareaDto[] | null;
    setTareasAEditar: React.Dispatch<React.SetStateAction<TareaDto[] | null>>;

    tareaSeleccionada: TareaDto | null;
    setTareaSeleccionada: React.Dispatch<React.SetStateAction<TareaDto | null>>;
    obtenerPagosAEditar: () => {},
    obtenerTareasAEditar: () => {}


}

const EditarGestionesContext = createContext<EditarGestionesContextProps | undefined>(undefined);

export const EditarGestionesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [abrirModalEditarGestiones, setAbrirModalEditarGestiones] = useState<boolean>(false);
    const [abrirModalEditarPagos, setAbrirModalEditarPagos] = useState<boolean>(false);
    const [abrirModalEditarTareas, setAbrirModalEditarTareas] = useState<boolean>(false);
    const [pagosSeleccionadoEditar, setPagosSeleccionadoEditar] = useState<PagoDto>(null)
    const [pagosAEditar, setPagosAEditar] = useState<PagoDto[]>([])
    const [gestionesAEditar, setGestionesAEditar] = useState<GestionDto[]>([])
    const [gestionSeleccionada, setgestionSeleccionada] = useState<GestionDto>(null)

    const [tareasAEditar, setTareasAEditar] = useState<TareaDto[]>([])
    const [tareaSeleccionada, setTareaSeleccionada] = useState<TareaDto>(null)
    const { startLoading, stopLoading } = useLoading();

    const obtenerPagosAEditar = async () => {
        startLoading();
        const response = await obtenerPagosServicioWeb();
        setPagosAEditar(response)
        stopLoading();
    }

    const obtenerTareasAEditar = async () => {
        startLoading();
        const response = await obtenerTareasServicioWeb();
        setTareasAEditar(response)
        stopLoading();
    }

    return (
        <EditarGestionesContext.Provider
            value={{
                abrirModalEditarGestiones,
                setAbrirModalEditarGestiones,
                abrirModalEditarPagos,
                setAbrirModalEditarPagos,
                abrirModalEditarTareas,
                setAbrirModalEditarTareas,
                pagosSeleccionadoEditar,
                setPagosSeleccionadoEditar,
                pagosAEditar,
                setPagosAEditar,
                obtenerPagosAEditar,
                gestionesAEditar,
                setGestionesAEditar,
                gestionSeleccionada,
                setgestionSeleccionada,
                tareasAEditar,
                setTareasAEditar,
                tareaSeleccionada,
                setTareaSeleccionada,
                obtenerTareasAEditar
            }}
        >
            {children}
        </EditarGestionesContext.Provider>
    );
};

export const useEditarGestiones = (): EditarGestionesContextProps => {
    const context = useContext(EditarGestionesContext);
    if (!context) {
        throw new Error("useEditarGestiones debe usarse dentro de un EditarGestionesProvider");
    }
    return context;
};
