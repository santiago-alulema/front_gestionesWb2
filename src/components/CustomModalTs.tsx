import React from 'react';
import { Box, IconButton, Modal, Stack } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

interface Props {
    open: boolean;
    children: React.ReactNode;
    handleClose: () => void;
    width?: number | string;
    positionTop?: number | string;
    positionLeft?: number | string;
    height?: number | string;
}

const CustomModalTs = ({
    open,
    children,
    handleClose,
    width = 600,
    positionTop = "",
    positionLeft = "",
    height = '90vh',
}: Props) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width,
                    maxHeight: height,
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Stack direction="row" justifyContent="flex-end">
                    <IconButton onClick={handleClose}>
                        <DisabledByDefaultIcon color="error" />
                    </IconButton>
                </Stack>

                {children}
            </Box>
        </Modal>
    );
};

export default CustomModalTs;
