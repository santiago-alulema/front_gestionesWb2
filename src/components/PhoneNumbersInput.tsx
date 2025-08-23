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
    useTheme,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TelefonosClientesActivos from '@/model/Dtos/In/TelefonosClientesActivos';
import { desactivarTelefonoCliente, grabarTelefonoCliente, telefonosActivosClientes, verificarEstadoTelefonoCliente } from '@/services/Service';
import CustomModalTs from '@/components/CustomModalTs';
import PhonesClientsOutDTO from '@/model/Dtos/Out/PhonesClientsOutDTO';
import { showAlert, showAlertConfirm } from '@/utils/modalAlerts';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

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
    const [checked, setChecked] = useState<boolean>(false);
    const [filtrarActivos, setFiltrarActivos] = useState<boolean>(false);

    const [seleccionarPropietario, setSeleccionarPropietario] = useState('');

    const seleccionarPropietarioTelefono = (event: SelectChangeEvent) => {
        setSeleccionarPropietario(event.target.value);
    };

    const seleccionarFiltrarActivos = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltrarActivos(event.target.checked);
        if (event.target.checked) {
            const phoneFilter = phones.filter(x => x.esValido)
            setPhones(phoneFilter)
        } else {
            await actualizarTelefonos();
        }
    };


    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const actualizarTelefonos = async () => {
        const nuevosTelefonos = await telefonosActivosClientes(cedula);
        setPhones(nuevosTelefonos);
    };


    const handleAddPhone = async () => {
        if (!phone) {
            const configAlert = {
                title: "Error",
                message: "El telefono no puede estar vacio",
                type: 'error',
                callBackFunction: false
            };
            showAlert(configAlert);
            return
        }
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
            esValido: !checked,
            origen: origenTelefono,
            telefono: phone,
            propietario: seleccionarPropietario
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
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom textAlign="center">
                Números de Teléfono
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filtrarActivos}
                        onChange={seleccionarFiltrarActivos}
                        icon={<CheckBoxOutlineBlank />}
                        checkedIcon={<CheckBox />}
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body1" color={filtrarActivos ? 'green' : 'black'}>
                        Filtrar solo los activos
                    </Typography>
                }
            />
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
                        maxLength: 10,
                        sx: {
                            height: '24px',
                        },
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
                                <ListItemText primary={
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {num.telefono}
                                        <strong>{num.propietario}</strong>
                                        {num.esValido}
                                        <strong style={{ color: num.esValido ? "green" : "red" }}>{num.esValido ? "Activo" : "Inactivo"}</strong>
                                    </div>
                                } />
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
                    <Box sx={{ minWidth: 120 }} mb={2}>
                        <FormControl fullWidth>
                            <InputLabel id="relation-select-label">Tipo de Relación</InputLabel>
                            <Select
                                labelId="relation-select-label"
                                id="relation-select"
                                value={seleccionarPropietario}
                                label="Tipo de Relación"
                                onChange={seleccionarPropietarioTelefono}
                            >
                                <MenuItem value="deudor">Deudor</MenuItem>
                                <MenuItem value="familiar">Familiar</MenuItem>
                                <MenuItem value="conyugue">Cónyuge</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChangeCheck}
                                    icon={<CheckBoxOutlineBlank />}
                                    checkedIcon={<CheckBox />}
                                    color="primary"
                                />
                            }
                            label={
                                <Typography variant="body1" color={checked ? 'error' : 'textPrimary'}>
                                    ¿El teléfono es inválido?
                                </Typography>
                            }
                        />
                    </Box>
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
