import ClientInfo from "@/model/Dtos/In/ClientInfo";

export interface ClientesInfoPaginacion {
    totalItems: number,
    pageNumber: number,
    pageSize: number,
    items: ClientInfo[]
}