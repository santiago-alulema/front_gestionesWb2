import { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GestionarLlamada from "@/Pages/GestionarCompromisosPagos/components/GestionarLlamada";
import GestionarCompromisoPago from "@/Pages/GestionarCompromisosPagos/components/GestionarCompromisoPago";
import GestionarTareaTarea from "@/Pages/GestionarCompromisosPagos/components/GestionarTareaTarea";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";

const AccordionGestionesCompromiso = () => {
    const { deudaSeleccionada } = useGestionarDeudas();
    const [expanded, setExpanded] = useState<string | false>(false);
    const theme = useTheme();

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Box mx="auto">
            <Typography
                textAlign="center"
                variant="h5"
                mb={3}
                fontWeight="bold"
                color="primary"
            >
                Gestionar Tarea: {deudaSeleccionada.tipoTarea}
            </Typography>

            <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: expanded === "panel1" ? 4 : 1,
                    "&:before": { display: "none" },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon htmlColor={theme.palette.primary.contrastText} />}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: "12px",
                    }}
                >
                    <Typography fontWeight="600">Gestión</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GestionarLlamada />
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                sx={{
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: expanded === "panel2" ? 4 : 1,
                    "&:before": { display: "none" },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon htmlColor={theme.palette.primary.contrastText} />}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: "12px",
                    }}
                >
                    <Typography fontWeight="600">Pago</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <GestionarCompromisoPago />
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                sx={{
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: expanded === "panel3" ? 4 : 1,
                    "&:before": { display: "none" },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon htmlColor={theme.palette.primary.contrastText} />}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: "12px",
                    }}
                >
                    <Typography fontWeight="600">Tarea</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <GestionarTareaTarea />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default AccordionGestionesCompromiso;
