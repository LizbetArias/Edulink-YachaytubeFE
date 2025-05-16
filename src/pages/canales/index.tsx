import { useState } from "react";
import Swal from "sweetalert2";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Add as AddIcon,
  Block as BlockIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  NotificationsActive as NotificationsActiveIcon,
  Person as PersonIcon,
  Public as PublicIcon,
  Recommend as RecommendIcon,
  Settings as SettingsIcon,
  Subscriptions as SubscriptionsIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";


// Tipos
interface Channel {
  id: number;
  name: string;
  owner: string;
  isPublic: boolean;
  isActive: boolean;
  avatar: string;
  banner: string;
  subscribers: number;
  videos: number;
  description?: string;
  category?: string;
}

// Datos de ejemplo
const initialChannels: Channel[] = [
  {
    id: 1,
    name: "Mi Canal Principal",
    owner: "Juanito Edulink",
    isPublic: true,
    isActive: true,
    avatar: "/avatars/juanito.png",
    banner: "https://www.shutterstock.com/image-vector/modern-black-blue-abstract-background-600nw-2519806569.jpg",
    subscribers: 1200,
    videos: 45,
    description: "Canal educativo principal",
    category: "Educación",
  },
  {
    id: 2,
    name: "Canal de Programación",
    owner: "Francis Dev",
    isPublic: true,
    isActive: true,
    avatar: "/avatars/francis.png",
    banner: "https://www.shutterstock.com/image-vector/abstract-background-design-diagonal-blue-260nw-2475424885.jpg",
    subscribers: 850,
    videos: 30,
    description: "Tutoriales de programación",
    category: "Tecnología",
  },
  {
    id: 3,
    name: "Matemáticas Avanzadas",
    owner: "Prof. Alexander",
    isPublic: false,
    isActive: true,
    avatar: "/avatars/alexander.png",
    banner: "https://img.freepik.com/vector-gratis/diseno-banner-fondo-profesional-negocios-abstracto-multiproposito_1340-16858.jpg",
    subscribers: 2500,
    videos: 60,
    description: "Matemáticas de nivel avanzado",
    category: "Matemáticas",
  },
];

// Datos de ejemplo para canales recomendados
const recommendedChannels: Channel[] = [
  {
    id: 4,
    name: "Física Divertida",
    owner: "Dr. Einstein",
    isPublic: true,
    isActive: true,
    avatar: "/avatars/einstein.png",
    banner: "https://example.com/banner4.jpg",
    subscribers: 5000,
    videos: 80,
    category: "Ciencias",
  },
  {
    id: 5,
    name: "Historia Mundial",
    owner: "Prof. Historia",
    isPublic: true,
    isActive: true,
    avatar: "/avatars/history.png",
    banner: "https://example.com/banner5.jpg",
    subscribers: 3500,
    videos: 65,
    category: "Historia",
  },
];

const ChannelsPage = () => {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    isPublic: true,
    isActive: true,
    description: '',
    category: '',
  });

  // Manejadores del menú de configuración
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<number | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, channelId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedChannelId(channelId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedChannelId(null);
  };

  // Manejadores del diálogo
  const handleOpenDialog = (mode: 'create' | 'edit', channel?: Channel) => {
    setDialogMode(mode);
    if (mode === 'edit' && channel) {
      setCurrentChannel(channel);
      setFormData({
        name: channel.name,
        owner: channel.owner,
        isPublic: channel.isPublic,
        isActive: channel.isActive,
        description: channel.description || '',
        category: channel.category || '',
      });
    } else {
      setFormData({
        name: '',
        owner: '',
        isPublic: true,
        isActive: true,
        description: '',
        category: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentChannel(null);
  };

  // Manejador del formulario
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isPublic' || name === 'isActive' ? checked : value,
    }));
  };

  // Manejador para guardar cambios
  const handleSave = () => {
    if (!formData.name || !formData.owner) {
      setSnackbar({ open: true, message: 'Por favor complete todos los campos requeridos', severity: 'error' });
      return;
    }

    if (dialogMode === 'create') {
      const newChannel: Channel = {
        id: Date.now(),
        ...formData,
        avatar: "/avatars/default.png",
        banner: "https://via.placeholder.com/1200x300",
        subscribers: 0,
        videos: 0,
      };
      setChannels(prev => [...prev, newChannel]);
      setSnackbar({ open: true, message: 'Canal creado exitosamente', severity: 'success' });
    } else if (currentChannel) {
      setChannels(prev =>
        prev.map(ch =>
          ch.id === currentChannel.id
            ? { ...ch, ...formData }
            : ch
        )
      );
      setSnackbar({ open: true, message: 'Canal actualizado exitosamente', severity: 'success' });
    }
    handleCloseDialog();
  };

  // Manejador para eliminar canal
  const handleDeleteChannel = (channelId: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setChannels(prev => prev.filter(ch => ch.id !== channelId));
        setSnackbar({ open: true, message: 'Canal eliminado exitosamente', severity: 'success' });
      }
    });
    handleCloseMenu();
  };

  // Manejador para cambiar estado activo/inactivo
  const handleToggleActive = (channelId: number) => {
    setChannels(prev =>
      prev.map(ch =>
        ch.id === channelId
          ? { ...ch, isActive: !ch.isActive }
          : ch
      )
    );
    handleCloseMenu();
  };

  // Renderizar contenido según la pestaña seleccionada
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0: // Mi Canal
        return (
          <Box sx={{ mb: 4 }}>
            {channels.length > 0 && (
              <Card sx={{ 
                borderRadius: 2,
                backgroundColor: 'background.paper',
                mb: 3
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={channels[0].banner}
                  alt={channels[0].name}
                />
                <Box sx={{ position: 'relative', mt: -8, px: 3 }}>
                  <Avatar
                    src={channels[0].avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid',
                      borderColor: 'background.paper',
                    }}
                  />
                </Box>
                <CardContent sx={{ pt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {channels[0].name}
                      </Typography>
                      <Typography color="text.secondary" paragraph>
                        {channels[0].description}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<SettingsIcon />}
                      onClick={(e) => handleOpenMenu(e, channels[0].id)}
                    >
                      Configurar
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip
                      icon={channels[0].isPublic ? <PublicIcon /> : <LockIcon />}
                      label={channels[0].isPublic ? 'Público' : 'Privado'}
                      color={channels[0].isPublic ? 'success' : 'warning'}
                    />
                    <Chip
                      icon={channels[0].isActive ? <NotificationsActiveIcon /> : <BlockIcon />}
                      label={channels[0].isActive ? 'Activo' : 'Inactivo'}
                      color={channels[0].isActive ? 'primary' : 'error'}
                    />
                    <Chip
                      label={`${channels[0].subscribers} suscriptores`}
                      variant="outlined"
                    />
                    <Chip
                      label={`${channels[0].videos} videos`}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        );

 // case 1: Canales Suscritos
case 1: 
  return (
    <Box 
      display="flex" 
      flexWrap="wrap" 
      justifyContent="space-between" 
      sx={{ gap: 3 }}
    >
      {channels.map((channel) => (
        <Box 
          key={channel.id} 
          sx={{ 
            flex: '1 1 calc(33% - 20px)', // Ajusta el tamaño de los elementos 
            marginBottom: 3 
          }}
        >
          <Card
            sx={{
              borderRadius: 2,
              backgroundColor: 'background.paper',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={channel.banner}
              alt={channel.name}
            />
            <Box sx={{ position: 'relative', mt: -5, textAlign: 'center' }}>
              <Avatar
                src={channel.avatar}
                sx={{
                  width: 80,
                  height: 80,
                  border: '4px solid',
                  borderColor: 'background.paper',
                  margin: '0 auto',
                }}
              />
            </Box>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                {channel.name}
              </Typography>
              <Typography color="text.secondary" align="center" gutterBottom>
                {channel.subscribers.toLocaleString()} suscriptores
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button size="small" startIcon={<NotificationsActiveIcon />}>
                  Suscrito
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );

      case 2: // Canales Recomendados
        return (
          <List>
            {recommendedChannels.map((channel) => (
              <Paper key={channel.id} sx={{ mb: 2, borderRadius: 2 }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={channel.avatar} sx={{ width: 56, height: 56 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={channel.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {channel.subscribers.toLocaleString()} suscriptores • {channel.videos} videos
                        </Typography>
                        <Chip
                          label={channel.category}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      size="small"
                    >
                      Suscribirse
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))}
          </List>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Encabezado con pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab 
            label="Mi Canal" 
            icon={<PersonIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Suscritos" 
            icon={<SubscriptionsIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Recomendados" 
            icon={<RecommendIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Botón para crear nuevo canal */}
      {selectedTab === 0 && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('create')}
            sx={{ borderRadius: 2 }}
          >
            Crear Nuevo Canal
          </Button>
        </Box>
      )}

      {/* Contenido de la pestaña seleccionada */}
      {renderTabContent()}

      {/* Menú de configuración */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 200 }
        }}
      >
        <MenuItem onClick={() => {
          const channel = channels.find(ch => ch.id === selectedChannelId);
          if (channel) handleOpenDialog('edit', channel);
          handleCloseMenu();
        }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar canal
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedChannelId) handleToggleActive(selectedChannelId);
        }}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          Activar/Desactivar
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          if (selectedChannelId) handleDeleteChannel(selectedChannelId);
        }} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Eliminar canal
        </MenuItem>
      </Menu>

      {/* Diálogo de creación/edición */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? 'Crear Nuevo Canal' : 'Editar Canal'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Nombre del canal"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
            <TextField
              fullWidth
              label="Propietario"
              name="owner"
              value={formData.owner}
              onChange={handleFormChange}
              required
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Categoría"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPublic}
                  onChange={handleFormChange}
                  name="isPublic"
                />
              }
              label="Canal público"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={handleFormChange}
                  name="isActive"
                />
              }
              label="Canal activo"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {dialogMode === 'create' ? 'Crear' : 'Guardar cambios'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChannelsPage;