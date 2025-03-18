import { Drawer, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CommonDrawer = ({ open, onClose, title, children, anchor = 'right' }) => {
    return (
        <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
        >
            <Box sx={{ width: 500, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{title}</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Box>

                <Box>
                    {children}
                </Box>
            </Box>
        </Drawer>
    );
};

export default CommonDrawer;