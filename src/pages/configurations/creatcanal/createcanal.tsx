import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Tabs,
  Tab,
  Alert,
  Divider,
  Avatar,
  ListItemAvatar,
  useTheme,
  useMediaQuery,
  Grid,
  CardActions,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Public as PublicIcon,
  Lock as PrivateIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
}

interface Canal {
  id: number;
  nombre: string;
  descripcion: string;
  propietario: Usuario;
  publico: boolean;
  activo: boolean;
  fechaCreacion: Date;
  usuarios: Usuario[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

const GestionCanales: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [canales, setCanales] = useState<Canal[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [tabActual, setTabActual] = useState(0);
  const [dialogAbiero, setDialogAbiero] = useState(false);
  const [editando, setEditando] = useState<Canal | null>(null);
  const [busquedaId, setBusquedaId] = useState('');
  const [canalesFiltrados, setCanalesFiltrados] = useState<Canal[]>([]);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'success' | 'error' | 'info' } | null>(null);

  // Estado para el formulario
  const [formCanal, setFormCanal] = useState({
    nombre: '',
    descripcion: '',
    propietarioId: 0,
    publico: true,
    activo: true
  });

  // Inicializar datos de ejemplo
  useEffect(() => {
    const usuariosEjemplo: Usuario[] = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
      { id: 2, nombre: 'María García', email: 'maria@example.com' },
      { id: 3, nombre: 'Carlos López', email: 'carlos@example.com' },
      { id: 4, nombre: 'Ana Martínez', email: 'ana@example.com' },
      { id: 5, nombre: 'Luis Rodríguez', email: 'luis@example.com' }
    ];
    setUsuarios(usuariosEjemplo);

    const canalesEjemplo: Canal[] = [
      {
        id: 1,
        nombre: 'General',
        descripcion: 'Canal general para todos',
        propietario: usuariosEjemplo[0],
        publico: true,
        activo: true,
        fechaCreacion: new Date(),
        usuarios: [usuariosEjemplo[0], usuariosEjemplo[1], usuariosEjemplo[2]]
      },
      {
        id: 2,
        nombre: 'Desarrollo',
        descripcion: 'Canal para equipo de desarrollo',
        propietario: usuariosEjemplo[1],
        publico: false,
        activo: true,
        fechaCreacion: new Date(),
        usuarios: [usuariosEjemplo[1], usuariosEjemplo[2]]
      }
    ];
    setCanales(canalesEjemplo);
    setCanalesFiltrados(canalesEjemplo);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, nuevoTab: number) => {
    setTabActual(nuevoTab);
  };

  const abrirDialog = (canal?: Canal) => {
    if (canal) {
      setEditando(canal);
      setFormCanal({
        nombre: canal.nombre,
        descripcion: canal.descripcion,
        propietarioId: canal.propietario.id,
        publico: canal.publico,
        activo: canal.activo
      });
    } else {
      setEditando(null);
      setFormCanal({
        nombre: '',
        descripcion: '',
        propietarioId: 0,
        publico: true,
        activo: true
      });
    }
    setDialogAbiero(true);
  };

  const cerrarDialog = () => {
    setDialogAbiero(false);
    setEditando(null);
  };

  const guardarCanal = () => {
    const propietario = usuarios.find(u => u.id === formCanal.propietarioId);
    if (!propietario) {
      mostrarMensaje('Debe seleccionar un propietario', 'error');
      return;
    }

    if (editando) {
      // Editar canal existente
      const canalesActualizados = canales.map(canal => 
        canal.id === editando.id 
          ? { 
              ...canal, 
              nombre: formCanal.nombre,
              descripcion: formCanal.descripcion,
              propietario,
              publico: formCanal.publico,
              activo: formCanal.activo
            }
          : canal
      );
      setCanales(canalesActualizados);
      setCanalesFiltrados(canalesActualizados);
      mostrarMensaje('Canal actualizado exitosamente', 'success');
    } else {
      // Crear nuevo canal
      const nuevoCanal: Canal = {
        id: canales.length + 1,
        nombre: formCanal.nombre,
        descripcion: formCanal.descripcion,
        propietario,
        publico: formCanal.publico,
        activo: formCanal.activo,
        fechaCreacion: new Date(),
        usuarios: [propietario]
      };
      const nuevosCanales = [...canales, nuevoCanal];
      setCanales(nuevosCanales);
      setCanalesFiltrados(nuevosCanales);
      mostrarMensaje('Canal creado exitosamente', 'success');
    }
    cerrarDialog();
  };

  const toggleActivo = (id: number) => {
    const canalesActualizados = canales.map(canal => 
      canal.id === id ? { ...canal, activo: !canal.activo } : canal
    );
    setCanales(canalesActualizados);
    setCanalesFiltrados(canalesActualizados);
    mostrarMensaje('Estado del canal actualizado', 'success');
  };

  const buscarPorId = () => {
    const id = parseInt(busquedaId);
    if (isNaN(id)) {
      setCanalesFiltrados(canales);
      return;
    }
    const resultado = canales.filter(canal => canal.id === id);
    setCanalesFiltrados(resultado);
    if (resultado.length === 0) {
      mostrarMensaje('No se encontró canal con ese ID', 'info');
    }
  };

  const mostrarMensaje = (texto: string, tipo: 'success' | 'error' | 'info') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  const renderTableDesktop = (canales: Canal[], showActions = true) => (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Propietario</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Visibilidad</TableCell>
            <TableCell>Usuarios</TableCell>
            {showActions && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {canales.map((canal) => (
            <TableRow key={canal.id}>
              <TableCell>{canal.id}</TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {canal.nombre}
                  </Typography>
                  {isTablet && (
                    <Typography variant="caption" color="textSecondary">
                      {canal.descripcion}
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {canal.propietario.nombre.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">{canal.propietario.nombre}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {canal.propietario.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {canal.activo ? <ActiveIcon color="success" /> : <InactiveIcon color="error" />}
                  <Chip 
                    label={canal.activo ? 'Activo' : 'Inactivo'}
                    color={canal.activo ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {canal.publico ? <PublicIcon color="primary" /> : <PrivateIcon color="secondary" />}
                  <Chip 
                    label={canal.publico ? 'Público' : 'Privado'}
                    color={canal.publico ? 'primary' : 'secondary'}
                    size="small"
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {canal.usuarios.length} usuarios
                </Typography>
              </TableCell>
              {showActions && (
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Editar">
                      <IconButton
                        onClick={() => abrirDialog(canal)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={canal.activo ? 'Desactivar' : 'Activar'}>
                      <Switch
                        checked={canal.activo}
                        onChange={() => toggleActivo(canal.id)}
                        size="small"
                      />
                    </Tooltip>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCardsMobile = (canales: Canal[], showActions = true) => (
    <Grid container spacing={2}>
      {canales.map((canal) => (
        <Grid key={canal.id} size={12}>
          <Card>
            <CardContent sx={{ pb: showActions ? 1 : 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="h3">
                  #{canal.id} - {canal.nombre}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Chip 
                    label={canal.activo ? 'Activo' : 'Inactivo'}
                    color={canal.activo ? 'success' : 'error'}
                    size="small"
                  />
                  <Chip 
                    label={canal.publico ? 'Público' : 'Privado'}
                    color={canal.publico ? 'primary' : 'secondary'}
                    size="small"
                  />
                </Box>
              </Box>
              
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {canal.descripcion}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PersonIcon fontSize="small" color="primary" />
                <Typography variant="body2" fontWeight="bold">
                  Propietario:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {canal.propietario.nombre.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body2">{canal.propietario.nombre}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {canal.propietario.email}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body2" color="textSecondary">
                <strong>Usuarios:</strong> {canal.usuarios.length}
              </Typography>
            </CardContent>
            
            {showActions && (
              <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => abrirDialog(canal)}
                  variant="outlined"
                  size="small"
                >
                  Editar
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    {canal.activo ? 'Activo' : 'Inactivo'}
                  </Typography>
                  <Switch
                    checked={canal.activo}
                    onChange={() => toggleActivo(canal.id)}
                    size="small"
                  />
                </Box>
              </CardActions>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {mensaje && (
        <Alert severity={mensaje.tipo} sx={{ mb: 2, mx: { xs: 1, sm: 0 } }}>
          {mensaje.texto}
        </Alert>
      )}

      <AppBar position="static">
        <Tabs 
          value={tabActual} 
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
        >
          <Tab label="Gestión" />
          <Tab label="Lista" />
          <Tab label="Búsqueda" />
        </Tabs>
      </AppBar>

      {/* Tab 1: Gestión de Canales */}
      <TabPanel value={tabActual} index={0}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' }, 
          mb: 3,
          gap: 2
        }}>
          <Typography variant={isMobile ? "h5" : "h4"} component="h1">
            Gestión de Canales
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => abrirDialog()}
            fullWidth={isMobile}
          >
            Crear Canal
          </Button>
        </Box>

        {isMobile ? renderCardsMobile(canales) : renderTableDesktop(canales)}
      </TabPanel>

      {/* Tab 2: Lista de Canales - Solo Propietarios */}
      <TabPanel value={tabActual} index={1}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom>
          Lista de Canales
        </Typography>
        
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {canales.map((canal) => (
            <Grid key={canal.id} size={12}>
              <Card>
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', sm: 'center' }, 
                    mb: 2,
                    gap: 2
                  }}>
                    <Box>
                      <Typography variant={isMobile ? "h6" : "h5"} component="h2">
                        {canal.nombre}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {canal.descripcion}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label={canal.publico ? 'Público' : 'Privado'}
                        color={canal.publico ? 'primary' : 'secondary'}
                        size="small"
                      />
                      <Chip 
                        label={canal.activo ? 'Activo' : 'Inactivo'}
                        color={canal.activo ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" component="h3" gutterBottom>
                    Propietario
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>{canal.propietario.nombre.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body1">{canal.propietario.nombre}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {canal.propietario.email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Tab 3: Búsqueda */}
      <TabPanel value={tabActual} index={2}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom>
          Buscar Canal por ID
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2, 
          mb: 3 
        }}>
          <TextField
            label="ID del Canal"
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
            type="number"
            variant="outlined"
            fullWidth={isMobile}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={buscarPorId}
            fullWidth={isMobile}
          >
            Buscar
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setBusquedaId('');
              setCanalesFiltrados(canales);
            }}
            fullWidth={isMobile}
          >
            Limpiar
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom>
          Resultados ({canalesFiltrados.length})
        </Typography>
        
        {isMobile ? renderCardsMobile(canalesFiltrados, false) : renderTableDesktop(canalesFiltrados, false)}
      </TabPanel>

      {/* Dialog para Crear/Editar Canal */}
      <Dialog 
        open={dialogAbiero} 
        onClose={cerrarDialog} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: { m: isMobile ? 0 : 1 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {editando ? 'Editar Canal' : 'Crear Nuevo Canal'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            pt: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: { xs: 2, sm: 3 }
          }}>
            <TextField
              autoFocus
              label="Nombre del Canal"
              fullWidth
              variant="outlined"
              value={formCanal.nombre}
              onChange={(e) => setFormCanal({ ...formCanal, nombre: e.target.value })}
              required
            />
            <TextField
              label="Descripción"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={formCanal.descripcion}
              onChange={(e) => setFormCanal({ ...formCanal, descripcion: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Propietario</InputLabel>
              <Select
                value={formCanal.propietarioId}
                label="Propietario"
                onChange={(e) => setFormCanal({ ...formCanal, propietarioId: e.target.value as number })}
                required
              >
                {usuarios.map((usuario) => (
                  <MenuItem key={usuario.id} value={usuario.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {usuario.nombre.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{usuario.nombre}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {usuario.email}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 2 }
            }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formCanal.publico}
                    onChange={(e) => setFormCanal({ ...formCanal, publico: e.target.checked })}
                  />
                }
                label={formCanal.publico ? 'Público' : 'Privado'}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formCanal.activo}
                    onChange={(e) => setFormCanal({ ...formCanal, activo: e.target.checked })}
                  />
                }
                label={formCanal.activo ? 'Activo' : 'Inactivo'}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 },
          p: { xs: 2, sm: 3 }
        }}>
          <Button 
            onClick={cerrarDialog}
            fullWidth={isMobile}
            sx={{ order: { xs: 2, sm: 1 } }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={guardarCanal} 
            variant="contained"
            fullWidth={isMobile}
            sx={{ order: { xs: 1, sm: 2 } }}
          >
            {editando ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GestionCanales;