import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  LinearProgress,
  Stack,
  Chip,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
  Divider,
  Grid
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";

// Tipos para nuestros datos
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  allocatedStorage: number;
  usedStorage: number;
}

const Permissions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@ejemplo.com",
      avatarUrl: "/api/placeholder/40/40",
      allocatedStorage: 20,
      usedStorage: 15,
    },
    {
      id: "2",
      name: "María González",
      email: "maria@ejemplo.com",
      avatarUrl: "/api/placeholder/40/40",
      allocatedStorage: 50,
      usedStorage: 10,
    },
    {
      id: "3",
      name: "Carlos Rodríguez",
      email: "carlos@ejemplo.com",
      avatarUrl: "/api/placeholder/40/40",
      allocatedStorage: 30,
      usedStorage: 25,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserStorage, setNewUserStorage] = useState(10);
  const [systemStorage, setSystemStorage] = useState({
    total: 1000,
    used: 550,
  });

  // Calcular el espacio disponible
  const availableStorage = systemStorage.total - systemStorage.used;

  const handleAddUser = () => {
    setEditingUser(null);
    setNewUserEmail("");
    setNewUserName("");
    setNewUserStorage(10);
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUserEmail(user.email);
    setNewUserName(user.name);
    setNewUserStorage(user.allocatedStorage);
    setOpenDialog(true);
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    if (userToDelete) {
      // Actualizar espacio usado del sistema
      setSystemStorage(prev => ({
        ...prev,
        used: prev.used - userToDelete.allocatedStorage,
      }));
      
      // Eliminar usuario
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Actualizar usuario existente
      const updatedUsers = users.map(user => {
        if (user.id === editingUser.id) {
          // Calcular el cambio en la asignación de almacenamiento
          const storageDifference = newUserStorage - user.allocatedStorage;
          
          // Actualizar el espacio usado del sistema
          setSystemStorage(prev => ({
            ...prev,
            used: prev.used + storageDifference,
          }));
          
          return {
            ...user,
            name: newUserName,
            email: newUserEmail,
            allocatedStorage: newUserStorage,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
    } else {
      // Agregar nuevo usuario
      const newUser: User = {
        id: Date.now().toString(),
        name: newUserName,
        email: newUserEmail,
        avatarUrl: "/api/placeholder/40/40",
        allocatedStorage: newUserStorage,
        usedStorage: 0,
      };
      
      setUsers([...users, newUser]);
      
      // Actualizar espacio usado del sistema
      setSystemStorage(prev => ({
        ...prev,
        used: prev.used + newUserStorage,
      }));
    }
    setOpenDialog(false);
  };

  // Componente de tarjeta para vista móvil
  const UserCard = ({ user }: { user: User }) => (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={user.avatarUrl} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" component="div" fontWeight="500">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="body2">Almacenamiento:</Typography>
            <Chip 
              label={`${user.allocatedStorage} GB`} 
              color="primary" 
              size="small" 
              sx={{ height: 24 }}
            />
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">
                {user.usedStorage} GB de {user.allocatedStorage} GB
              </Typography>
              <Typography variant="body2">
                {Math.round((user.usedStorage / user.allocatedStorage) * 100)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(user.usedStorage / user.allocatedStorage) * 100} 
              sx={{ mt: 0.5, height: 6, borderRadius: 3 }}
            />
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
        <IconButton 
          onClick={() => handleEditUser(user)} 
          color="primary" 
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton 
          onClick={() => handleDeleteUser(user.id)} 
          color="error" 
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2rem' } }}>
        Administración de Permisos de Almacenamiento
      </Typography>

      {/* Indicador de almacenamiento del sistema */}
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <StorageIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Almacenamiento del sistema</Typography>
        </Box>
        
        <Box sx={{ 
          mb: 1, 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          justifyContent: "space-between"
        }}>
          <Typography variant="body2" sx={{ mb: isMobile ? 1 : 0 }}>
            Usado: {systemStorage.used} GB de {systemStorage.total} GB
          </Typography>
          <Typography variant="body2">
            Disponible: {availableStorage} GB
          </Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={(systemStorage.used / systemStorage.total) * 100} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            backgroundColor: 'grey.300',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'success.main'
            }
          }} 
        />
      </Paper>

      {/* Lista de usuarios con permisos */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", 
        alignItems: isMobile ? "flex-start" : "center", 
        mb: 2 
      }}>
        <Typography variant="h6" sx={{ mb: isMobile ? 1 : 0 }}>Permisos de usuarios</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          size={isMobile ? "small" : "medium"}
          sx={{ alignSelf: isMobile ? "flex-end" : "auto" }}
        >
          Añadir Usuario
        </Button>
      </Box>

      {/* Vista para escritorio */}
      {!isMobile && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Almacenamiento Asignado</TableCell>
                <TableCell>Espacio Utilizado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src={user.avatarUrl} sx={{ mr: 2 }} />
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={`${user.allocatedStorage} GB`} color="primary" />
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="column" sx={{ maxWidth: 200 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2">
                          {user.usedStorage} GB de {user.allocatedStorage} GB
                        </Typography>
                        <Typography variant="body2">
                          {Math.round((user.usedStorage / user.allocatedStorage) * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(user.usedStorage / user.allocatedStorage) * 100} 
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditUser(user)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Vista para móvil */}
      {isMobile && (
        <Box sx={{ mt: 2 }}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Box>
      )}

      {/* Diálogo para añadir/editar usuario - Adaptado para móvil */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          {editingUser ? "Editar Permisos de Usuario" : "Añadir Nuevo Usuario"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Correo electrónico"
            type="email"
            fullWidth
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Typography gutterBottom>
            Almacenamiento asignado: {newUserStorage} GB
          </Typography>
          <Slider
            value={newUserStorage}
            onChange={(_, value) => setNewUserStorage(value as number)}
            min={1}
            max={100}
            step={1}
            valueLabelDisplay="auto"
            marks={[
              { value: 1, label: '1 GB' },
              { value: 50, label: '50 GB' },
              { value: 100, label: '100 GB' },
            ]}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Espacio disponible en el sistema: {availableStorage} GB
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: isMobile ? 2 : 1.5 }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button 
            onClick={handleSaveUser} 
            color="primary"
            variant="contained"
            disabled={!newUserName || !newUserEmail || newUserStorage <= 0}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Permissions;