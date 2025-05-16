import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
  CircularProgress,
  styled,
  AlertColor,
  Container,
  InputAdornment,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { EducationalSeat, EducationalSeatService } from '../../../features/interfaces/EducationalSeat';

// Styled components for dark theme
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  border: '1px solid #333333',
  borderRadius: theme.shape.borderRadius,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  }
}));

const EducationalSeats = () => {
  const [seats, setSeats] = useState<EducationalSeat[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [currentSeat, setCurrentSeat] = useState<EducationalSeat | null>(null);
  const [formData, setFormData] = useState({ name: '', active: true }); // Default active is true
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Load data
  useEffect(() => {
    loadSeats();
  }, []);

  const loadSeats = () => {
    setLoading(true);
    try {
      // Using the EducationalSeatService instead of mock data
      const data = EducationalSeatService.getSeats();
      setSeats(data);
    } catch (error) {
      showSnackbar('Error cargando sedes educativas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredSeats = seats.filter(seat => 
    seat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateDialog = () => {
    setFormData({ name: '', active: true }); // Default active is true
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (seat: EducationalSeat) => {
    setFormData({ name: seat.name, active: seat.active });
    setCurrentSeat(seat);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSeat(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'active' ? checked : value
    });
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      showSnackbar('El nombre es obligatorio', 'error');
      return;
    }

    try {
      if (dialogMode === 'create') {
        EducationalSeatService.createSeat({
          name: formData.name,
          active: true // Always set active to true for new entries
        });
        showSnackbar('Sede educativa creada exitosamente', 'success');
      } else if (currentSeat) {
        EducationalSeatService.updateSeat(currentSeat.id, {
          name: formData.name,
          active: formData.active
        });
        showSnackbar('Sede educativa actualizada exitosamente', 'success');
      }
      loadSeats();
      handleCloseDialog();
    } catch (error) {
      showSnackbar(`Error ${dialogMode === 'create' ? 'creando' : 'actualizando'} sede educativa`, 'error');
    }
  };

  const handleDeleteSeat = (id: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta sede educativa?')) {
      try {
        const success = EducationalSeatService.deleteSeat(id);
        if (success) {
          showSnackbar('Sede educativa eliminada exitosamente', 'success');
          loadSeats();
        } else {
          showSnackbar('Sede educativa no encontrada', 'error');
        }
      } catch (error) {
        showSnackbar('Error eliminando sede educativa', 'error');
      }
    }
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    try {
      EducationalSeatService.updateSeat(id, { active: !currentActive });
      showSnackbar(`Sede educativa ${!currentActive ? 'activada' : 'desactivada'} exitosamente`, 'success');
      loadSeats();
    } catch (error) {
      showSnackbar('Error actualizando estado de sede educativa', 'error');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ 
      py: 3, 
      backgroundColor: '#121212',
      color: 'white',
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center', 
        justifyContent: 'space-between',
        mb: 3 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 2 : 0 }}>
          <PersonIcon sx={{ mr: 1, color: 'white' }} />
          <Typography variant="h5" component="h1" fontWeight="bold" color="white">
            SEDES EDUCATIVAS
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
          color="primary"
          sx={{ 
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#388e3c'
            }
          }}
        >
          Agregar colegio
        </Button>
      </Box>

      <StyledCard sx={{ mb: 3 }}>
        <CardContent sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          paddingBottom: '16px !important'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: isMobile ? 2 : 0
          }}>
            <SchoolIcon sx={{ mr: 1, color: 'white' }} />
            <Typography variant="body1" sx={{ mr: 1, color: 'white' }}>
              IEP Nombre del Colegio o Institución
            </Typography>
            <Chip 
              label="Vinculado" 
              color="success" 
              size="small" 
              sx={{
                backgroundColor: '#4caf50'
              }}
            />
          </Box>
          
          <TextField
            placeholder="Buscar sedes..."
            variant="outlined"
            size="small"
            fullWidth={isMobile}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'gray' }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: '#333',
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#444'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#666'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4caf50'
                }
              }
            }}
            sx={{ 
              width: isMobile ? '100%' : '40%',
              '& .MuiInputBase-input': {
                color: 'white'
              }
            }}
          />
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : filteredSeats.length > 0 ? (
            <List sx={{ p: 0 }}>
              {filteredSeats.map((seat, index) => (
                <React.Fragment key={seat.id}>
                  <StyledListItem
                    secondaryAction={
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        flexDirection: isMobile ? 'column' : 'row'
                      }}>
                        <Switch
                          edge="end"
                          checked={seat.active}
                          onChange={() => handleToggleActive(seat.id, seat.active)}
                          color="success"
                          size={isMobile ? "small" : "medium"}
                        />
                        <IconButton edge="end" onClick={() => handleOpenEditDialog(seat)} sx={{ color: '#2196f3' }}>
                          <EditIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDeleteSeat(seat.id)} sx={{ color: '#f44336' }}>
                          <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={<Typography variant={isMobile ? "body1" : "h6"} color="white">{seat.name}</Typography>}
                      secondary={
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: seat.active ? '#4caf50' : '#f44336',
                              mr: 1
                            }}
                          />
                          <Typography variant="body2" color="gray">
                            {seat.active ? 'Activo' : 'Inactivo'} • Creado el {new Date(seat.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </StyledListItem>
                  {index < filteredSeats.length - 1 && (
                    <Divider component="li" sx={{ borderColor: '#333' }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="gray">
                {searchTerm ? 'No se encontraron sedes educativas' : 'No hay sedes educativas añadidas'}
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                onClick={handleOpenCreateDialog}
                color="primary"
                sx={{ 
                  mt: 2,
                  borderColor: '#4caf50',
                  color: '#4caf50',
                  '&:hover': {
                    borderColor: '#388e3c',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)'
                  }
                }}
              >
                Agregar colegio
              </Button>
            </Box>
          )}
        </CardContent>
      </StyledCard>

      {/* Create/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
        PaperProps={{
          style: {
            backgroundColor: '#212121',
            color: 'white'
          }
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          {dialogMode === 'create' ? 'Agregar Nuevo Colegio' : 'Editar Sede Educativa'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre de la Sede Educativa"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#555',
                },
                '&:hover fieldset': {
                  borderColor: '#777',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: '#aaa',
                '&.Mui-focused': {
                  color: '#4caf50',
                },
              }
            }}
          />
          {/* Removed the Estado Activo switch since it should be true by default */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#aaa' }}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ 
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#388e3c'
              }
            }}
          >
            {dialogMode === 'create' ? 'Crear' : 'Actualizar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EducationalSeats;