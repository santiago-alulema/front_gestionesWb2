import { Box, Card, CardContent, CardHeader } from '@mui/material';
import React, { ReactNode, useEffect } from 'react';
import HeaderBasePage from '@/components/DataGridCommon/HeaderBasePage';
import { LoadingContextProvider } from '@/components/LoadingContext';

interface BasePageProps {
    routers?: any[]; // Puedes reemplazar `any` por un tipo más específico si tienes uno para las rutas
    title?: string | null;
    showRequiredFieldLabel?: boolean;
    showBreadcrumbs?: boolean;
    showBackButton?: boolean;
    showLanguageSelector?: boolean;
    useAuxiliaryBackFunction?: boolean;
    auxiliaryBackFunction?: () => void;
    children: ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({
    routers = [],
    title = null,
    showRequiredFieldLabel = false,
    showBreadcrumbs = true,
    showBackButton = true,
    showLanguageSelector = false,
    useAuxiliaryBackFunction = false,
    auxiliaryBackFunction = () => { },
    children,
}) => {
    const headerProps = {
        routers,
        title,
        showRequiredFieldLabel,
        showBreadcrumbs,
        showBackButton,
        showLanguageSelector,
        useAuxiliaryBackFunction,
        auxiliaryBackFunction,
    };

    useEffect(() => {
    }, [routers]);

    return (
        <LoadingContextProvider>
            <Box paddingInline={2}>
                <Card sx={{ px: '40px', py: '20px' }} elevation={5}>
                    <CardHeader component={() => <HeaderBasePage {...headerProps} />} />
                    <CardContent sx={{ mt: 2 }}>{children}</CardContent>
                </Card>
            </Box>
        </LoadingContextProvider>
    );
};

export default BasePage;
