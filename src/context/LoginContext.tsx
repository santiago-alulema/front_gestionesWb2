// src/contexts/LoginContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserData {
    name: string;
    fullName: string;
    role: string;
    isSessionActive: boolean;
    jti: string;
    iss: string;
    aud: string;
    telefono: string;
    // Puedes añadir otros campos que estén en tu token aquí
}

interface LoginContextType {
    token: string | null;
    userData: UserData | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
};

interface LoginProviderProps {
    children: ReactNode;
}

const LOCAL_STORAGE_KEY = "tokenApp";

// Función para decodificar el token JWT y normalizar los claims
const decodeJWT = (token: string): UserData | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const payload = JSON.parse(jsonPayload);

        // Normalizamos los claims con URLs a nombres más simples
        return {
            name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            isSessionActive: payload.isSessionActive === "True",
            jti: payload.jti,
            iss: payload.iss,
            aud: payload.aud,
            fullName: payload.fullName,
            telefono: payload.telefono
        };
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};

export const LoginProvider = ({ children }: LoginProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedToken) {
            setToken(storedToken);
            setUserData(decodeJWT(storedToken));
        }
    }, []);

    const login = (newToken: string) => {
        const decoded = decodeJWT(newToken);
        if (decoded) {
            setToken(newToken);
            setUserData(decoded);
            localStorage.setItem(LOCAL_STORAGE_KEY, newToken);
        } else {
            console.error("Invalid token provided");
        }
    };

    const logout = () => {
        setToken(null);
        setUserData(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    return (
        <LoginContext.Provider
            value={{
                token,
                userData,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};