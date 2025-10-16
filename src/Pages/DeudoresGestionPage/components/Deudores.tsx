import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import { useLoading } from '@/components/LoadingContext';
import ClientInfo from '@/model/Dtos/In/ClientInfo';
import { ConfigurarColumnaDeudores } from '@/Pages/DeudoresGestionPage/config/ConfigurarColumnaDeudores';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import ListaEmpresasInDto from '@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto';
import { empresasServicioWeb } from '@/Pages/DeudoresGestionPage/services/GestionDeudaServicios';
import { allDeuodoresServiceWeb } from '@/services/Service';
import { readStateFromStorage, writeStateToStorage } from '@/utils/MetodosAuxiliares';
import { Grid, Paper } from '@mui/material';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const Deudores = () => {
    const [clientDebt, setClientDebt] = useState<ClientInfo[]>([]);
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

    useEffect(() => {
        let alive = true;
        (async () => {
            startLoading();
            try {
                const listaEmpresaRespuesta = await empresasServicioWeb();
                if (!alive) return;

                const lista = [{ id: "TODOS", nombre: "Todos" }, ...listaEmpresaRespuesta.filter(e => e.id !== "TODOS")];
                setEmpresas(lista);

                // 2) Resolver valores iniciales
                const empresaInit = initialEmpresa || "TODOS";
                const filtroInit = initialFiltro || "";
                setEmpresaSeleccionada(empresaInit);
                setOpcionGestion(filtroInit);

                // 3) Cargar deudores iniciales
                setClientDebt([]);
                const resp = await allDeuodoresServiceWeb(empresaInit, filtroInit);
                if (!alive) return;
                setClientDebt(resp);

                // Evita que el siguiente useEffect repita la consulta inicial
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
            tooltip: "Ver", onClick: viewDebtsClient, hidden: false, sizeIcon: 'small', typeInput: 'button', label: 'Ver',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    const lastQueryRef = useRef<string>("");

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
                setClientDebt([]);
                const resp = await allDeuodoresServiceWeb(empresa, gestion /* , { signal: ac.signal } si tu servicio lo soporta */);
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
                    getRowId={(row) => row.cedula}
                    /* quita este key para evitar remontar el grid */
                    /* key={`grid-${empresaSeleccionada}`} */
                    rows={clientDebt}
                    columns={ConfigurarColumnaDeudores()}
                    gridId="gidDeudoresPrincipal"
                    actions={actionsConfig}
                    iconDirectionFilter="end"
                    searchLabel={"Buscar"}
                    titleEmptyTable='Tabla sin datos'
                    maintainFilter={true}
                />
            </Paper>
        </>
    );
};

export default Deudores;
