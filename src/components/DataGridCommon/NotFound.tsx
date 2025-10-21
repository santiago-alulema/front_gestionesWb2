import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router';

interface Props {
    title?: string,
    text?: string,
    hiddenButton?: boolean
}
const NotFound = ({
    title = "¡Oops! No se encontró la información",
    text = "Parece que el servicio técnico que buscas no existe o fue eliminado.Por favor, revisa el enlace o vuelve al inicio.",
    hiddenButton = false
}: Props) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50vh",
                textAlign: "center",
                color: "text.secondary",
                px: 2,
            }}
        >
            <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/7486/7486802.png"
                alt="Not Found"
                sx={{
                    width: { xs: 160, sm: 220 },
                    height: "auto",
                    mb: 3,
                    opacity: 0.9,
                }}
            />
            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ color: "text.primary", mb: 1 }}
            >
                {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, maxWidth: 420 }}>
                {text}
            </Typography>
            {!hiddenButton && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 5, px: 4 }}
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </Button>
            )}

        </Box>
    )
}

export default NotFound