import EndPointMigraciones from "@/Pages/MigracionesPages/services/EndPointMigraciones";
import { request } from "@/utils/AxiosUtils";
import { MigracionesInDTO } from '../models/MigracionesInDTO';
import { RegistroPagoOutDTO } from "@/Pages/MigracionesPages/models/RegistroPagoOutDTO";

export const migracionesComprimosGestiones = (migraciones: MigracionesInDTO[]) =>
    request<String>(
        'post',
        EndPointMigraciones.MIGRAR_GESTIONES_COMPROMISOS,
        migraciones
    );

export const migracionesPagos = (migraciones: RegistroPagoOutDTO[]) =>
    request<String>(
        'post',
        EndPointMigraciones.MIGRAR_PAGOS,
        migraciones
    );