import { Box, IconButton, Modal, Stack } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

interface Props {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  width?: number;
  onSave?: () => void;
}

const CustomModalTs = ({ open, children, handleClose, width = 600 }: Props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
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
