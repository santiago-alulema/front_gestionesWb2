import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

// Definir la interfaz del contexto
interface LoadingContextType {
    showLoading: boolean;
    setShowLoading: Dispatch<SetStateAction<boolean>>;
}

// Crear el contexto con valor por defecto undefined (forzado con `!`)
export const LoadingContext = createContext<LoadingContextType>({
    showLoading: false,
    setShowLoading: () => { }
});

interface LoadingContextProviderProps {
    children: ReactNode;
}

export const LoadingContextProvider: React.FC<LoadingContextProviderProps> = ({ children }) => {
    const [showLoading, setShowLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ showLoading, setShowLoading }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: theme => theme.zIndex.modal + 1 }}
                open={showLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </LoadingContext.Provider>
    );
};
