import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  NotificationsActive as NotificationsActiveIcon,
  Block as BlockIcon,
  Public as PublicIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

import { Channel } from './interfaces';

interface CanalProps {
  channel: Channel;
  onEdit: (channel: Channel) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number) => void;
}

const Canal: React.FC<CanalProps> = ({ channel, onEdit, onDelete, onToggleActive }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);
  const [editedChannel, setEditedChannel] = useState<Channel>(channel);

  const handleEditClick = () => {
    setEditedChannel({ ...channel });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    onEdit(editedChannel);
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setEditedChannel(prev => ({
      ...prev,
      [name]: name === 'isPublic' || name === 'isActive' ? checked : value
    }));
  };

  return (
    <Card sx={{ 
      mb: 2,
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper,
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={channel.banner}
        alt={channel.name}
      />
      <Box sx={{ position: 'relative', mt: -8, px: 3 }}>
        <Avatar
          src={channel.avatar}
          sx={{
            width: 120,
            height: 120,
            border: '4px solid',
            borderColor: 'background.paper',
          }}
        />
      </Box>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {channel.name}
            </Typography>
            <Typography color="text.secondary" paragraph>
              {channel.description}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleEditClick} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(channel.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip
            icon={channel.isPublic ? <PublicIcon /> : <LockIcon />}
            label={channel.isPublic ? 'Público' : 'Privado'}
            color={channel.isPublic ? 'success' : 'warning'}
          />
          <Chip
            icon={channel.isActive ? <NotificationsActiveIcon /> : <BlockIcon />}
            label={channel.isActive ? 'Activo' : 'Inactivo'}
            color={channel.isActive ? 'primary' : 'error'}
          />
          <Chip
            label={`${channel.subscribers} suscriptores`}
            variant="outlined"
          />
          <Chip
            label={`${channel.videos} videos`}
            variant="outlined"
          />
        </Box>
      </CardContent>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Canal</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Nombre del canal"
              name="name"
              value={editedChannel.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={editedChannel.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={editedChannel.isPublic}
                  onChange={handleInputChange}
                  name="isPublic"
                />
              }
              label="Canal público"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={editedChannel.isActive}
                  onChange={handleInputChange}
                  name="isActive"
                />
              }
              label="Canal activo"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Canal;