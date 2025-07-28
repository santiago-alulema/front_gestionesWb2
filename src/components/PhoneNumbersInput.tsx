import { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    Stack,
    Divider,
    Paper,
    Button,
    useMediaQuery,
    useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TelefonosClientesActivos from '@/model/Dtos/In/TelefonosClientesActivos';
import { desactivarTelefonoCliente, grabarTelefonoCliente, telefonosActivosClientes, verificarEstadoTelefonoCliente } from '@/services/Service';
import CustomModalTs from '@/components/CustomModalTs';
import PhonesClientsOutDTO from '@/model/Dtos/Out/PhonesClientsOutDTO';
import { showAlert, showAlertConfirm } from '@/utils/modalAlerts';

interface phoneNumbersProps {
    phones: TelefonosClientesActivos[],
    cedula: string,
    setPhones: React.Dispatch<React.SetStateAction<TelefonosClientesActivos[]>>
}

const MAX_ITEMS_PER_PAGE = 3;

const PhoneNumbersInput = ({ phones, setPhones, cedula }: phoneNumbersProps) => {
    const [phone, setPhone] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [abrirModalOrigenTelefono, setAbrirModalOrigenTelefono] = useState<boolean>(false);
    const [abrirModalEliminarTelefono, setAbrirModalEliminarTelefono] = useState<boolean>(false);
    const [telefonoElimnar, setTelefonoEliminar] = useState<string>("");
    const [idTelefonoElimnar, setIdTelefonoEliminar] = useState<string>("");
    const [observacionEliminar, setObservacionEliminar] = useState<string>("");


    const [origenTelefono, setOrigenTelefono] = useState<string>("");



    const actualizarTelefonos = async () => {
        const nuevosTelefonos = await telefonosActivosClientes(cedula);
        setPhones(nuevosTelefonos);
    };


    const handleAddPhone = async () => {
        const verificarTelefono = await verificarEstadoTelefonoCliente(phone);
        let mensaje = '';
        if (verificarTelefono.estado === 'NoExiste') {
            setAbrirModalOrigenTelefono(true)
            return
        }
        if (verificarTelefono.estado === 'Inactivo') {
            mensaje = `El telefono se encuentra inactivo por: <strong> ${verificarTelefono.observacion} </strong>`;
        }
        if (verificarTelefono.estado === 'Existe') {
            ; mensaje = "El telefono se encuentra registrado ";
        }
        const configAlert = {
            title: "Advertencia",
            message: mensaje,
            type: 'warning',
            callBackFunction: false
        };
        showAlert(configAlert);
    };

    const grabarTelefonoNuevo = async () => {
        const telegonoNuevo: PhonesClientsOutDTO = {
            cedula: cedula,
            esValido: true,
            origen: origenTelefono,
            telefono: phone
        }
        await grabarTelefonoCliente(telegonoNuevo);
        const configAlert = {
            title: "Correcto",
            message: "El numero de telefono se grabo correctamente.",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        setAbrirModalOrigenTelefono(false);
        await actualizarTelefonos();
    }

    const handleDelete = (telefono: any) => {
        setTelefonoEliminar(telefono.telefono)
        setAbrirModalEliminarTelefono(true)
        setIdTelefonoEliminar(telefono.idDeudorTelefonos)
    };

    const eliminarTelefono = async () => {
        const configAlert = {
            title: "informacion",
            message: "¿Desea eliminar el telefono?",
            type: 'warning',
            callBackFunction: false
        };
        const respuesta = await showAlertConfirm(configAlert);
        if (respuesta) {
            const telefonoParaEliminar = {
                idTelefono: idTelefonoElimnar,
                observacion: observacionEliminar,
            }
            await desactivarTelefonoCliente(telefonoParaEliminar)
            const configAlert = {
                title: "Correcto",
                message: "El numero de telefono se elimino correctamente.",
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
            await actualizarTelefonos();
            setAbrirModalEliminarTelefono(false)
            return
        }

        setAbrirModalEliminarTelefono(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPhone(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["e", "E", "+", "-", "."].includes(e.key)) {
            e.preventDefault();
        }
    };


    const totalPages = Math.ceil(phones.length / MAX_ITEMS_PER_PAGE);
    const paginatedPhones = phones.slice(
        page * MAX_ITEMS_PER_PAGE,
        (page + 1) * MAX_ITEMS_PER_PAGE
    );

    return (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom textAlign="center">
                Números de Teléfono
            </Typography>

            <Stack direction={isMobile ? 'column' : 'row'} spacing={1} alignItems="center" >
                <TextField
                    label="Número de teléfono"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    error={phone.length > 0 && phone.length < 8}
                    helperText={
                        phone.length > 0 && phone.length < 8
                            ? "Debe tener al menos 8 dígitos"
                            : " "
                    }
                    inputProps={{
                        inputMode: 'numeric',
                        maxLength: 15
                    }}
                />
                <IconButton onClick={handleAddPhone} color="primary" sx={{ height: 40 }}>
                    <AddIcon />
                </IconButton>
            </Stack>

            <Divider />

            {phones.length > 0 ? (
                <>
                    <List dense>
                        {paginatedPhones.map((num, idx) => (
                            <ListItem
                                key={idx}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => handleDelete(num)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={num.telefono} />
                            </ListItem>
                        ))}
                    </List>

                    <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Button
                            size="small"
                            onClick={() => setPage(p => Math.max(p - 1, 0))}
                            disabled={page === 0}
                        >
                            Anterior
                        </Button>
                        <Typography variant="body2" align="center">
                            Página {page + 1} de {totalPages}
                        </Typography>
                        <Button
                            size="small"
                            onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
                            disabled={page + 1 >= totalPages}
                        >
                            Siguiente
                        </Button>
                    </Stack>
                </>
            ) : (
                <Typography variant="body2" align="center" color="text.secondary">
                    No hay teléfonos registrados.
                </Typography>
            )}
            <CustomModalTs open={abrirModalOrigenTelefono} positionTop='20%' positionLeft='38%' handleClose={() => setAbrirModalOrigenTelefono(prev => !prev)}>
                <Paper sx={{ p: 5 }} >
                    <Typography textAlign='center' variant='h6' mb={3}>
                        Escriba el origen del telefono: <strong>{phone}</strong> para registrar.
                    </Typography>
                    <TextField variant='outlined' multiline={true} rows={5} onChange={(e) => setOrigenTelefono(e.target.value)} fullWidth></TextField>
                    <Button variant='contained' sx={{ mt: 2, borderRadius: 5 }} fullWidth onClick={grabarTelefonoNuevo}>Grabar Telefono</Button>
                </Paper>
            </CustomModalTs>

            <CustomModalTs open={abrirModalEliminarTelefono} positionTop='20%' positionLeft='38%' handleClose={() => setAbrirModalEliminarTelefono(prev => !prev)}>
                <Paper sx={{ p: 5 }} >
                    <Typography textAlign='center' variant='h6' mb={3}>
                        Escriba la razon para eliminar el registro del telefono: <strong>{telefonoElimnar}</strong>.
                    </Typography>
                    <TextField variant='outlined' multiline={true} rows={5} onChange={(e) => setObservacionEliminar(e.target.value)} fullWidth></TextField>
                    <Button variant='contained' sx={{ mt: 2, borderRadius: 5 }} fullWidth onClick={eliminarTelefono}>Eliminar Telefono</Button>
                </Paper>
            </CustomModalTs>
        </Paper>
    );
};

export default PhoneNumbersInput;
