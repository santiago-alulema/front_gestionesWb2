import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import {
    Box,
    Typography,
    LinearProgress,
    Paper,
    Chip,
    IconButton,
    Tooltip,
    styled,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from '@mui/material';
import {
    InsertDriveFile as FileIcon,
    Close as CloseIcon,
    CloudUpload as UploadIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon
} from '@mui/icons-material';

interface ExcelUploaderProps {
    legend?: string;
    acceptedFileTypes?: string[];
    requiredColumns?: { [columnName: string]: 'string' | 'number' | 'boolean' };
    onFileProcessed?: (data: any[]) => void;
    maxFileSize?: number; // in MB
}

interface ExcelRow {
    [key: string]: any;
}

const DropzoneContainer = styled(Paper)<{ isDragActive: boolean }>(({ theme, isDragActive }) => ({
    border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: isDragActive ? theme.palette.action.hover : theme.palette.background.paper,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover
    }
}));

const UploadExcel: React.FC<ExcelUploaderProps> = ({
    legend = "Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionarlo",
    acceptedFileTypes = ['.xlsx', '.xls', '.csv'],
    requiredColumns = {},
    onFileProcessed,
    maxFileSize = 5
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [fileData, setFileData] = useState<ExcelRow[]>([]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null);
        setValidationErrors([]);
        setFileData([]);

        if (acceptedFiles.length === 0) {
            setError('Por favor, sube un archivo Excel válido.');
            return;
        }

        const selectedFile = acceptedFiles[0];

        if (selectedFile.size > maxFileSize * 1024 * 1024) {
            setError(`El archivo es demasiado grande. Tamaño máximo permitido: ${maxFileSize}MB.`);
            return;
        }

        setFile(selectedFile);
        processExcelFile(selectedFile);
    }, [maxFileSize]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv']
        },
        maxFiles: 1
    });

    const processExcelFile = (file: File) => {
        setIsLoading(true);
        setProgress(0);

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                setProgress(30);
                if (!e.target?.result) {
                    throw new Error('No se pudo leer el archivo');
                }

                const data = new Uint8Array(e.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                setProgress(60);

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (jsonData.length < 2) {
                    throw new Error('El archivo Excel está vacío o no tiene datos.');
                }

                const headers = jsonData[0] as string[];
                const columnNames = Object.keys(requiredColumns);
                const missingColumns = columnNames.filter(col => !headers.includes(col));

                if (missingColumns.length > 0) {
                    setValidationErrors(missingColumns);
                    throw new Error(`Columnas faltantes: ${missingColumns.join(', ')}`);
                }

                const rows = (jsonData.slice(1) as any[]).reduce<ExcelRow[]>((acc, row, index) => {
                    const isEmptyRow = row.every((cell: any) => cell === undefined || cell === null || cell === '');
                    if (isEmptyRow) return acc;

                    const rowObj: ExcelRow = { __rowNumber: index + 2 };
                    headers.forEach((header: string, i: number) => {
                        rowObj[header] = row[i];
                    });

                    const errorsInRow: string[] = [];

                    for (const [col, expectedType] of Object.entries(requiredColumns)) {
                        let value = rowObj[col];

                        if (value !== undefined && value !== null && value !== '') {
                            try {
                                switch (expectedType) {
                                    case 'string':
                                        rowObj[col] = String(value);
                                        break;
                                    case 'number':
                                        const num = Number(value);
                                        if (isNaN(num)) throw new Error(`${col} debe ser un número válido`);
                                        rowObj[col] = num;
                                        break;
                                    case 'boolean':
                                        if (value === 1 || value === '1' || value === true || value === 'true') {
                                            rowObj[col] = true;
                                        } else if (value === 0 || value === '0' || value === false || value === 'false') {
                                            rowObj[col] = false;
                                        } else {
                                            throw new Error(`${col} debe ser booleano (1/0 o true/false)`);
                                        }
                                        break;
                                    default:
                                        rowObj[col] = value;
                                }
                            } catch (conversionError) {
                                errorsInRow.push((conversionError as Error).message);
                            }
                        } else {
                            // valor vacío en columna requerida
                            errorsInRow.push(`${col} no puede estar vacío`);
                        }
                    }


                    if (errorsInRow.length > 0) {
                        throw new Error(`Fila ${index + 2}: ${errorsInRow.join(', ')}`);
                    }

                    acc.push(rowObj);
                    return acc;
                }, []);

                setFileData(rows);
                setProgress(100);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
                setProgress(0);
            } finally {
                setIsLoading(false);
            }
        };

        reader.onerror = () => {
            setError('Error al leer el archivo. Por favor, intenta nuevamente.');
            setIsLoading(false);
            setProgress(0);
        };

        reader.onprogress = (progressEvent: ProgressEvent<FileReader>) => {
            if (progressEvent.lengthComputable) {
                const percentLoaded = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setProgress(percentLoaded > 90 ? 90 : percentLoaded);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileData([]);
        setError(null);
        setValidationErrors([]);
        setProgress(0);
    };

    const fileSize = useMemo(() => {
        if (!file) return '0 KB';
        const sizeInKB = file.size / 1024;
        return sizeInKB < 1024 ? `${sizeInKB.toFixed(2)} KB` : `${(sizeInKB / 1024).toFixed(2)} MB`;
    }, [file]);

    return (
        <Box sx={{ width: '100%' }}>
            <DropzoneContainer {...getRootProps()} isDragActive={isDragActive} elevation={3}>
                <input {...getInputProps()} />
                <UploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                    {legend}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Formatos aceptados: {acceptedFileTypes.join(', ')}. Tamaño máximo: {maxFileSize}MB
                </Typography>
                {Object.keys(requiredColumns).length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                            Columnas requeridas:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center', mt: 1 }}>
                            {Object.entries(requiredColumns).map(([col, type]) => (
                                <Chip
                                    key={col}
                                    label={`${col} (${type})`}
                                    size="small"
                                    color={validationErrors.includes(col) ? 'error' : 'default'}
                                    icon={validationErrors.includes(col) ? <ErrorIcon fontSize="small" /> : undefined}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </DropzoneContainer>

            {isLoading && (
                <Box sx={{ mt: 2 }}>
                    <LinearProgress variant="determinate" value={progress} />
                    <Typography variant="caption" color="text.secondary">
                        Procesando archivo... {progress}%
                    </Typography>
                </Box>
            )}

            {error && (
                <Paper elevation={0} sx={{ mt: 2, p: 2, backgroundColor: 'error.light' }}>
                    <Box display="flex" alignItems="center">
                        <ErrorIcon color="error" sx={{ mr: 1 }} />
                        <Typography color="error">{error}</Typography>
                    </Box>
                </Paper>
            )}

            {file && !isLoading && (
                <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                                <FileIcon color="success" />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1">{file.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {fileSize} · {fileData.length} filas procesadas
                                </Typography>
                            </Box>
                        </Box>
                        <Tooltip title="Eliminar archivo">
                            <IconButton onClick={handleRemoveFile}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {fileData.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Vista previa de datos:
                            </Typography>
                            <List dense sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #eee', borderRadius: 1 }}>
                                {fileData.slice(0, 3).map((row, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="success" fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Fila ${row.__rowNumber}`}
                                        />
                                    </ListItem>
                                ))}
                                {fileData.length > 3 && (
                                    <ListItem>
                                        <ListItemText
                                            primary={`... y ${fileData.length - 3} filas más`}
                                            primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    )}
                </Paper>
            )}

            {fileData.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onFileProcessed?.(fileData)}
                        startIcon={<UploadIcon />}
                    >
                        Enviar Datos
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default UploadExcel;
