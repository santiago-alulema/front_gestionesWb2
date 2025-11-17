import { useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { ActualizarUsuarioDto, UsuarioDto, UsuarioRow } from "@/Pages/AdministracionUsuario/models/UsuarioDto";
import useCrudUsuarios from "@/Pages/AdministracionUsuario/hooks/useCrudUsuarios";

interface EditarUsuarioFormProps {
    usuario: UsuarioDto;
    loading?: boolean;
    onSubmit: (data: ActualizarUsuarioDto) => Promise<void> | void;
    onCancel: () => void;
    editar: boolean;

}

interface FormState {
    nombreUsuario: string;
    rol: string;
    contrasena: string;
    email: string;
    telefono: string;
    nombreCompleto: string;
    codigoUsuario: string;
    cedula: string;


}

const EditarUsuarioForm: React.FC<EditarUsuarioFormProps> = ({
    usuario,
    loading = false,
    onSubmit,
    onCancel,
    editar = false
}) => {
    const [form, setForm] = useState<FormState>({
        nombreUsuario: "",
        rol: "",
        contrasena: "",
        email: "",
        telefono: "",
        nombreCompleto: "",
        codigoUsuario: "",
        cedula: ""
    });


    useEffect(() => {
        if (usuario) {
            setForm({
                nombreUsuario: usuario.nombreUsuario,
                rol: usuario.rol,
                contrasena: usuario.contrasena,
                email: usuario.email,
                telefono: usuario.telefono,
                nombreCompleto: usuario.nombreCompleto,
                codigoUsuario: usuario.codigoUsuario,
                cedula: usuario.idUsuario
            });
        }
    }, [usuario]);

    const handleChange =
        (field: keyof FormState) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setForm(prev => ({
                    ...prev,
                    [field]: event.target.value
                }));
            };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: ActualizarUsuarioDto = {
            idUsuario: editar ? usuario.idUsuario : form.cedula,   // importante, lo exige el DTO
            nombreUsuario: form.nombreUsuario,
            rol: form.rol,
            contrasena: form.contrasena,
            email: form.email,
            telefono: form.telefono,
            nombreCompleto: form.nombreCompleto,
            codigoUsuario: form.codigoUsuario
        };

        await onSubmit(payload);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
                {editar ? "Editar" : "Grabar"} usuario
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ lg: 6, sm: 6 }}>
                    <TextField
                        label="cedula"
                        fullWidth
                        size="small"
                        value={form.cedula}
                        onChange={handleChange("cedula")}
                    />
                </Grid>
                <Grid size={{ lg: 6, sm: 6 }}>
                    <TextField
                        label="Nombre de usuario"
                        fullWidth
                        size="small"
                        value={form.nombreUsuario}
                        onChange={handleChange("nombreUsuario")}
                    />
                </Grid>

                <Grid size={{ lg: 6, sm: 6 }}>
                    <TextField
                        label="Rol"
                        fullWidth
                        size="small"
                        select
                        value={form.rol}
                        onChange={handleChange("rol")}
                    >
                        <MenuItem value="">
                            <em>Seleccionar rol…</em>
                        </MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={{ lg: 6, sm: 6 }}>
                    <TextField
                        label="Contraseña"
                        fullWidth
                        size="small"
                        value={form.contrasena}
                        onChange={handleChange("contrasena")}
                    />
                </Grid>

                <Grid size={{ lg: 6 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        size="small"
                        value={form.email}
                        onChange={handleChange("email")}
                    />
                </Grid>

                <Grid size={{ lg: 6 }}>
                    <TextField
                        label="Teléfono"
                        fullWidth
                        size="small"
                        value={form.telefono}
                        onChange={handleChange("telefono")}
                    />
                </Grid>

                <Grid size={{ lg: 12 }}>
                    <TextField
                        label="Nombre completo"
                        fullWidth
                        size="small"
                        value={form.nombreCompleto}
                        onChange={handleChange("nombreCompleto")}
                    />
                </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar cambios"}
                </Button>
            </Box>
        </Box>
    );
};

export default EditarUsuarioForm;
