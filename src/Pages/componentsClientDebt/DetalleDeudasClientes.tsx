import ClientInfo from '@/model/Dtos/In/ClientInfo';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from 'react';
import { deudasPorClienteServiceWeb } from '@/services/Service';
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs';
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import { useConfigDebtsByClient } from '@/Pages/ConfigColums/useConfigDebtsByClient';
import GestionarDeuda from '@/Pages/componentsClientDebt/GestionarDeuda';

interface Props {
    client: ClientInfo
}
export const DetalleDeudasClientes = ({ client }: Props) => {

    const [debts, setDebts] = useState<DebstByClientInfoInDTO[]>([])
    const [debt, setDebt] = useState<DebstByClientInfoInDTO>()
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const onInit = async () => {
        const response = await deudasPorClienteServiceWeb(client.cedula);
        setDebts(response)
    }
    useEffect(() => {
        onInit();
    }, [])

    const selectDebt = (row: DebstByClientInfoInDTO) => {
        setDebt(row)
        setIsVisible(true)
    }
    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: selectDebt,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'button',
            label: 'Gestionar',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    return (
        <>
            <Box >
                <div style={{ display: isVisible ? "none" : "block" }}>
                    <Card sx={{ maxWidth: 600, width: "100%", p: 1, boxShadow: 0 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                                    <PersonIcon />
                                </Avatar>
                                <Typography variant="h5" fontWeight="bold">
                                    {client.nombre}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid >
                                    <Box display="flex" alignItems="center">
                                        <LocationOnIcon color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body1">{client.direccion}</Typography>
                                    </Box>
                                </Grid>

                                <Grid >
                                    <Box display="flex" alignItems="center">
                                        <PhoneIcon color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body1">{client.telefono}</Typography>
                                    </Box>
                                </Grid>

                                <Grid >
                                    <Box display="flex" alignItems="center">
                                        <EmailIcon color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body1">{client.correo}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <CustomDataGridTs
                        rows={debts}
                        columns={useConfigDebtsByClient()}
                        gridId="gidChartOfAccounts"
                        columsHide={['id']}
                        hiddenFilterColumn={['actions']}
                        actions={actionsConfig}
                        iconDirectionFilter="end"
                        searchLabel={"Buscar"}
                    />
                </div>
                {isVisible && (<GestionarDeuda debt={debt} setIsVisible={setIsVisible} />)}
            </Box >
        </>
    )
}
