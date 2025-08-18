import TelefonosClientesActivos from '@/model/Dtos/In/TelefonosClientesActivos';
import TipoGestioneOutDTO from '@/model/Dtos/In/TipoGestioneOutDTO';
import { telefonosActivosClientes, tipoGestionHijosPorPadreId } from '@/services/Service';
import { useState, useEffect, useCallback } from 'react';

const GestionDeudasHook = () => {
    const [gestionesPadre, setGestionesPadre] = useState<TipoGestioneOutDTO[]>([]);
    const [gestionHijo, setgestionHijo] = useState<TipoGestioneOutDTO[]>([]);
    const [telefonosActivos, setTelefonosActivos] = useState<TelefonosClientesActivos[]>([])

    const obtenerTelefonosCliente = async (cedulaCliente: string) => {
        const telefonosRespuesta = await telefonosActivosClientes(cedulaCliente);
        setTelefonosActivos(telefonosRespuesta);
    }

    // const llenarGestionesPadre = async () => {
    //     const gesitionesPadreRespuesta = await tipoGestionPadre();
    //     setGestionesPadre(gesitionesPadreRespuesta);
    // }

    const LlenarGestionesHijo = async (gestionPadreId: string) => {
        if (!gestionPadreId) {
            return setgestionHijo([]);
        }
        const gestionesHijo = await tipoGestionHijosPorPadreId(gestionPadreId);
        setgestionHijo(gestionesHijo)
    }

    useEffect(() => {
        // llenarGestionesPadre();
    }, [])


    return {
        gestionesPadre,
        gestionHijo,
        LlenarGestionesHijo,
        telefonosActivos,
        obtenerTelefonosCliente,
        setTelefonosActivos
    };
};

export default GestionDeudasHook;