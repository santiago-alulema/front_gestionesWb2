import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import { useLoading } from '@/components/LoadingContext';
import { ClientesInfoPaginacion } from '@/model/Dtos/In/ClientesInfoPaginacion';
import ClientInfo from '@/model/Dtos/In/ClientInfo';
import { ConfigurarColumnaDeudores } from '@/Pages/DeudoresGestionPage/config/ConfigurarColumnaDeudores';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import ListaEmpresasInDto from '@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto';
import { empresasServicioWeb } from '@/Pages/DeudoresGestionPage/services/GestionDeudaServicios';
import { allDeuodoresServiceWeb } from '@/services/Service';
import { readStateFromStorage, writeStateToStorage } from '@/utils/MetodosAuxiliares';
import { Grid, Paper } from '@mui/material';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const Deudores = () => {
    const [clientDebt, setClientDebt] = useState<ClientesInfoPaginacion>(null);
    const [empresas, setEmpresas] = useState<ListaEmpresasInDto[]>([{ id: "TODOS", nombre: "Todos" }]);

    const keyStorageEmpresa = "EmpresaDeudorFiltro";
    const keyStorageFiltro = "FiltroEstadoCliente";

    const {
        setDeudorSeleccionado,
        empresaSeleccionada,
        setEmpresaSeleccionada,
        opcionGestion,
        setOpcionGestion
    } = useGestionarDeudas();

    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoading();

    const initialEmpresa = useMemo(
        () => readStateFromStorage<string>(keyStorageEmpresa) || "TODOS",
        []
    );
    const initialFiltro = useMemo(
        () => readStateFromStorage<{ id?: string }>(keyStorageFiltro)?.id || "",
        []
    );

    const lastQueryRef = useRef<string>("");

    // server-side (1-based)
    const pageNumberRef = useRef<number>(1);
    const pageSizeRef = useRef<number>(5);

    const fetchDeudores = useCallback(async (empresa: string, gestion: string, pageNumber: number, pageSize: number) => {
        startLoading();
        try {
            setClientDebt(null);
            const resp = await allDeuodoresServiceWeb(empresa, gestion, pageNumber, pageSize);
            setClientDebt(resp);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    useEffect(() => {
        let alive = true;
        (async () => {
            startLoading();
            try {
                const listaEmpresaRespuesta = await empresasServicioWeb();
                if (!alive) return;

                const lista = [{ id: "TODOS", nombre: "Todos" }, ...listaEmpresaRespuesta.filter(e => e.id !== "TODOS")];
                setEmpresas(lista);

                const empresaInit = initialEmpresa || "TODOS";
                const filtroInit = initialFiltro || "";
                setEmpresaSeleccionada(empresaInit);
                setOpcionGestion(filtroInit);

                // ✅ RESTAURAR PAGINACIÓN DEL GRID (localStorage)
                type Persisted = { filters?: any[]; pageSize?: number; currentPage?: number };
                const restoredGrid = readStateFromStorage<Persisted>("custom-dx-grid:gidDeudoresPrincipal");

                pageSizeRef.current = restoredGrid?.pageSize ?? 5;
                pageNumberRef.current = (restoredGrid?.currentPage ?? 0) + 1; // currentPage 0-based -> API 1-based

                setClientDebt(null);

                const resp = await allDeuodoresServiceWeb(
                    empresaInit,
                    filtroInit,
                    pageNumberRef.current,
                    pageSizeRef.current
                );

                if (!alive) return;
                setClientDebt(resp);

                lastQueryRef.current = `${empresaInit}|||${filtroInit}`;
            } finally {
                if (alive) stopLoading();
            }
        })();

        return () => { alive = false; };
    }, []);

    const viewDebtsClient = (row: ClientInfo) => {
        setDeudorSeleccionado(row);
        navigate("/gestion/dudas-por-clientes");
    };

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: viewDebtsClient,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'button',
            label: 'Ver',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    useEffect(() => {
        const empresa = empresaSeleccionada || "TODOS";
        const gestion = opcionGestion || "";
        if (!empresa) return;

        const signature = `${empresa}|||${gestion}`;
        if (lastQueryRef.current === signature) return;
        lastQueryRef.current = signature;

        const ac = new AbortController();
        let alive = true;

        (async () => {
            startLoading();
            try {
                // ✅ cuando cambia empresa/filtro, reset a página 1 (mantén size actual)
                pageNumberRef.current = 1;

                setClientDebt(null);

                const resp = await allDeuodoresServiceWeb(
                    empresa,
                    gestion,
                    pageNumberRef.current,
                    pageSizeRef.current
                );

                if (!alive || ac.signal.aborted) return;
                setClientDebt(resp);
            } finally {
                if (alive && !ac.signal.aborted) stopLoading();
            }
        })();

        return () => { alive = false; ac.abort(); };
    }, [empresaSeleccionada, opcionGestion]);

    const opcionesFiltro = [
        { id: 'G', name: 'GESTIONADOS' },
        { id: 'SG', name: 'SIN GESTIONAR' },
        { id: 'IN', name: 'INCUMPLIDOS' }
    ];

    const handleEmpresaChange = (_: any, value: ListaEmpresasInDto | null) => {
        const next = value?.id || "TODOS";
        if (next !== empresaSeleccionada) {
            setEmpresaSeleccionada(next);
            writeStateToStorage(keyStorageEmpresa, next);
            lastQueryRef.current = "";
        }
    };

    const handleFiltroChange = (_: any, value: { id?: string; name?: string } | null) => {
        const next = value?.id || "";
        if (next !== opcionGestion) {
            setOpcionGestion(next);
            writeStateToStorage(keyStorageFiltro, { id: next, name: value?.name || "" });
            lastQueryRef.current = "";
        }
    };

    const empresaValue = useMemo(
        () => empresas.find(e => e.id === (empresaSeleccionada || "TODOS")) || null,
        [empresas, empresaSeleccionada]
    );
    const filtroValue = useMemo(
        () => opcionesFiltro.find(x => x.id === (opcionGestion || "")) || null,
        [opcionesFiltro, opcionGestion]
    );

    const handlePaginationChange = async (pageNumber: number, pageSize: number) => {
        pageNumberRef.current = pageNumber; // 1-based
        pageSizeRef.current = pageSize;

        const empresa = empresaSeleccionada || "TODOS";
        const gestion = opcionGestion || "";

        await fetchDeudores(empresa, gestion, pageNumber, pageSize);
    };

    return (
        <>
            <Grid container mb={2} spacing={2}>
                <Grid size={{ lg: 6 }}>
                    <CustomAutocompleteTs
                        options={empresas}
                        label='Seleccione Empresa'
                        labelFullField='Empresa'
                        optionLabel='nombre'
                        defaultValue={empresaValue}
                        handleChange={handleEmpresaChange}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <CustomAutocompleteTs
                        options={opcionesFiltro}
                        label='Seleccione Filtro'
                        labelFullField='Filtro'
                        defaultValue={filtroValue}
                        handleChange={handleFiltroChange}
                    />
                </Grid>
            </Grid>

            <Paper elevation={3}>
                <CustomDataGridTs
                    getRowId={(row) => (row as any).cedula}
                    rows={clientDebt?.items ?? []}
                    columns={ConfigurarColumnaDeudores()}
                    gridId="gidDeudoresPrincipal"
                    actions={actionsConfig}
                    iconDirectionFilter="end"
                    searchLabel={"Buscar"}
                    titleEmptyTable='Tabla sin datos'
                    maintainFilter={true}
                    pagination={{
                        totalItems: clientDebt?.totalItems ?? 0,
                        pageNumber: clientDebt?.pageNumber ?? pageNumberRef.current,
                        pageSize: clientDebt?.pageSize ?? pageSizeRef.current,
                    }}
                    onPaginationChange={handlePaginationChange}
                />
            </Paper>
        </>
    );
};

export default Deudores;
