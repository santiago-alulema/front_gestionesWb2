import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

// Definimos el tipo del contexto
interface LoadingContextType {
    showLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType>({
    showLoading: false,
    startLoading: () => { },
    stopLoading: () => { },
});

interface LoadingContextProviderProps {
    children: ReactNode;
}

export const LoadingContextProvider: React.FC<LoadingContextProviderProps> = ({ children }) => {
    const [showLoading, setShowLoading] = useState(false);

    const startLoading = () => {
        console.log("showLoading")

        setShowLoading(true)
        console.log("showLoading")
    };
    const stopLoading = () => setShowLoading(false);

    return (
        <LoadingContext.Provider value={{ showLoading, startLoading, stopLoading }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
                open={showLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </LoadingContext.Provider>
    );
};
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading debe usarse dentro de un LoadingContextProvider');
    }
    return context;
};