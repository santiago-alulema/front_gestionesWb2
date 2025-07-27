import {
    Box,
    Breadcrumbs,
    Grid,
    IconButton,
    Link,
    Tooltip,
    Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from 'react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useTheme } from '@emotion/react';


interface RouteItem {
    id: number;
    text: string;
    link?: string;
    disabled?: boolean;
    function?: (id: number) => void;
}

interface HeaderBasePageProps {
    title?: string | null;
    showBreadcrumbs?: boolean;
    showRequiredFieldLabel?: boolean;
    showBackButton?: boolean;
    routers?: RouteItem[];
    showLanguageSelector?: boolean;
    useAuxiliaryBackFunction?: boolean;
    auxiliaryBackFunction?: () => void;
}

const HeaderBasePage: React.FC<HeaderBasePageProps> = ({
    title = null,
    showBreadcrumbs = true,
    showRequiredFieldLabel = false,
    showBackButton = true,
    routers = [],
    showLanguageSelector = false,
    useAuxiliaryBackFunction = false,
    auxiliaryBackFunction = () => { }
}) => {
    const [routes, setRoutes] = useState<RouteItem[]>([]);
    const theme = useTheme();


    const handleClickLinkItem = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        item: RouteItem
    ) => {
        e.preventDefault();
        if (!item.disabled && item.function) {
            item.function(item.id);
        }
    };

    const handleBack = () => {
        if (useAuxiliaryBackFunction) {
            auxiliaryBackFunction();
        }
        const minLength = 1;
        if (routes.length === minLength) {
            // goToHome();
        } else {
            const disabledStep = routes.find(route => route.disabled);
            if (disabledStep?.function) {
                disabledStep.function(disabledStep.id - 1);
            }
        }
    };

    useEffect(() => {
        setRoutes(routers);
    }, [routers]);

    return (
        <>
            <Grid container>
                <Grid >
                    {showBreadcrumbs && (
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="primary"
                                variant="subtitle2"
                            // onClick={() => goToHome()}
                            >
                                <HomeIcon sx={{ mr: 0.5, mt: '-2px' }} fontSize="inherit" />
                                HOME
                            </Link>
                            {routes.map((item, index) => (
                                <Link
                                    id={String(item.id)}
                                    underline="none"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color={item.disabled ? 'inherit' : 'primary'}
                                    href={item.link}
                                    key={`path_${index}`}
                                    variant="subtitle2"
                                    onClick={e => handleClickLinkItem(e, item)}
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </Breadcrumbs>
                    )}
                </Grid>

            </Grid>
            <Box display={'inline-flex'} mt={2}>
                {showBackButton && (
                    <div>
                        <Tooltip title={"retornar"}>
                            <IconButton
                                onClick={handleBack}
                                style={{
                                    backgroundColor: '#1976D2',
                                    borderRadius: '50%',
                                    color: 'white',
                                    marginRight: '10px'
                                }}
                            >
                                <ArrowBackIosRoundedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
                <div>
                    <Typography variant="h4" fontWeight={'bold'}>
                        {title}
                    </Typography>
                    {showRequiredFieldLabel && (
                        <Typography variant="subtitle2" color={'error'}>
                            (*) {"requerido"}
                        </Typography>
                    )}
                </div>
            </Box>
        </>
    );
};

export default HeaderBasePage;
