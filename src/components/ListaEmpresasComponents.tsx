import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs";
import ListaEmpresasInDto from "@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto";
import { empresasServicioWeb } from "@/Pages/DeudoresGestionPage/services/GestionDeudaServicios";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    handlerChange?: (item: string) => void;
}
const ListaEmpresasComponents = ({ handlerChange }: Props) => {
    const [empresas, setEmpresas] = useState<ListaEmpresasInDto[]>([]);

    const CargarEmpresas = async () => {
        const listaEmpresaRespuesta = await empresasServicioWeb();
        setEmpresas(listaEmpresaRespuesta);
    }

    useEffect(() => {
        CargarEmpresas();
    }, [])


    return (
        <Grid container mb={2} spacing={2}>
            <Grid size={{ lg: 12 }}>
                <CustomAutocompleteTs
                    options={empresas}
                    label='Seleccione Empresa'
                    labelFullField='Empresa'
                    optionLabel='nombre'
                    // defaultValue={empresaValue}
                    handleChange={(e, value: any) => handlerChange(value.id)}
                />
            </Grid>

        </Grid>
    )
}

export default ListaEmpresasComponents