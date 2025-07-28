import { Box, IconButton, Modal, Stack } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

interface Props {
    open: boolean;
    children: React.ReactNode;
    handleClose: () => void;
    width?: number;
    onSave?: () => void;
    positionTop?: string;
    positionLeft?: string;
}

const CustomModalTs = ({ open, children, handleClose, width = 600, positionTop = null, positionLeft = null }: Props) => {
    const style = {
        position: 'absolute',
        top: !!positionTop ? positionTop : '5%',
        left: !!positionLeft ? positionLeft : '30%',
        transform: 'translate(-50%a, -50%)',
        width: width,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: '12px',
    };
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} >
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <IconButton onClick={handleClose}>
                            <DisabledByDefaultIcon color="error" />
                        </IconButton>
                    </Stack>
                    {children}
                </Box>
            </Modal>
        </>
    );
};

export default CustomModalTs;
