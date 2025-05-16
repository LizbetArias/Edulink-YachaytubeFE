import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  Tooltip,
  Fab,
  Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { 
  MoreVert as MoreVertIcon, 
  People as PeopleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  SwapHoriz as SwapHorizIcon,
  Add as AddIcon
} from "@mui/icons-material";

// Define type for user roles
type Role = "SUPER ADMIN" | "ADMIN" | "USER";

// Define interface for collaborator data
interface Collaborator {
  id: number;
  name: string;
  email: string;
  role: Role;
  active?: boolean;
}

const Collaborators = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: 1,
      name: "Francis Pachas Lume",
      email: "francisLume@yachaytube.edu.pe",
      role: "SUPER ADMIN",
      active: true
    },
    {
      id: 2,
      name: "Francis Pachas Lume",
      email: "francisLume@yachaytube.edu.pe",
      role: "SUPER ADMIN",
      active: true
    },
    {
      id: 3,
      name: "Francis Pachas Lume",
      email: "francisLume@yachaytube.edu.pe",
      role: "ADMIN",
      active: true
    },
    {
      id: 4,
      name: "Francis Pachas Lume",
      email: "francisLume@yachaytube.edu.pe",
      role: "ADMIN",
      active: false
    },
    {
      id: 5,
      name: "Francis Pachas Lume",
      email: "francisLume@yachaytube.edu.pe",
      role: "ADMIN",
      active: true
    },
    {
      id: 6,
      name: "Francis Pachas Lume",
      email: "francisLume@yachaytube.edu.pe",
      role: "USER",
      active: true
    },
    {
      id: 7,
      name: "Francis Pachas Lume",
      email: "francisLume@yachaytube.edu.pe",
      role: "USER",
      active: true
    }
  ]);

  // State for dropdown menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [currentCollaborator, setCurrentCollaborator] = useState<Collaborator | null>(null);
  
  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Collaborator>({
    id: 0,
    name: "",
    email: "",
    role: "USER"
  });
  
  // State for role change modal
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [newRole, setNewRole] = useState<Role>("USER");

  // Function to determine chip color based on role
  const getChipColor = (role: Role): "success" | "primary" | "secondary" | "default" => {
    switch (role) {
      case "SUPER ADMIN":
        return "secondary";
      case "ADMIN":
        return "primary";
      case "USER":
        return "success";
      default:
        return "default";
    }
  };

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, collaborator: Collaborator) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentCollaborator(collaborator);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Modal handlers
  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({
      id: Date.now(), // Generate a temporary ID
      name: "",
      email: "",
      role: "USER" 
    });
    setModalOpen(true);
  };

  const handleEditClick = (collaborator: Collaborator) => {
    setIsEditing(true);
    setFormData(collaborator);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      // Update existing collaborator
      setCollaborators(prev => 
        prev.map(collab => 
          collab.id === formData.id ? formData : collab
        )
      );
    } else {
      // Add new collaborator
      setCollaborators(prev => [
        ...prev,
        { ...formData, active: true }
      ]);
    }
    setModalOpen(false);
  };

  // Role modal handlers
  const handleRoleChangeClick = () => {
    if (currentCollaborator) {
      setNewRole(currentCollaborator.role);
      setRoleModalOpen(true);
      handleMenuClose();
    }
  };

  const handleRoleModalClose = () => {
    setRoleModalOpen(false);
  };

  const handleRoleChange = (e: SelectChangeEvent<Role>) => {
    setNewRole(e.target.value as Role);
  };

  const handleRoleSubmit = () => {
    if (currentCollaborator) {
      setCollaborators(prev => 
        prev.map(collab => 
          collab.id === currentCollaborator.id ? { ...collab, role: newRole } : collab
        )
      );
      setRoleModalOpen(false);
    }
  };

  // Toggle active status
  const handleToggleActive = () => {
    if (currentCollaborator) {
      setCollaborators(prev => 
        prev.map(collab => 
          collab.id === currentCollaborator.id ? { ...collab, active: !collab.active } : collab
        )
      );
      handleMenuClose();
    }
  };

  // Delete collaborator
  const handleDelete = (id: number) => {
    setCollaborators(prev => prev.filter(collab => collab.id !== id));
  };

  // Group collaborators by role for better visual organization
  const groupedCollaborators = {
    "SUPER ADMIN": collaborators.filter(c => c.role === "SUPER ADMIN"),
    "ADMIN": collaborators.filter(c => c.role === "ADMIN"),
    "USER": collaborators.filter(c => c.role === "USER")
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "background.paper", 
      p: { xs: 1, sm: 2, md: 3 },
      position: "relative"
    }}>
      {/* Header */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        mb: 3 
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PeopleIcon sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1" fontWeight="bold">
          Gestiona a tus Colaboradores
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ 
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          Agregar Usuario
        </Button>
      </Box>

      {/* Collaborators list grouped by role */}
      <Paper elevation={1} sx={{ overflow: "hidden", mb: 8 }}>
        {Object.entries(groupedCollaborators).map(([role, users], roleIndex) => (
          users.length > 0 && (
            <Box key={role}>
              {/* Section header with role name */}
              <Box 
                sx={{ 
                  px: 2, 
                  py: 1, 
                  bgcolor: theme.palette.action.hover,
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  {role} ({users.length})
                </Typography>
              </Box>
              
              {/* Users with this role */}
              <List disablePadding>
                {users.map((collaborator, index) => (
                  <ListItem 
                    key={collaborator.id}
                    divider={index !== users.length - 1}
                    sx={{ 
                      py: 1.5,
                      opacity: collaborator.active === false ? 0.6 : 1,
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      width: isMobile ? '100%' : 'auto'
                    }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ bgcolor: "orange" }}
                        >
                          {collaborator.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={collaborator.name}
                        secondary={collaborator.email}
                        primaryTypographyProps={{
                          fontWeight: "medium"
                        }}
                      />
                    </Box>
                    
                    {/* Mobile status chip row */}
                    {isMobile && (
                      <Box sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1, 
                        mb: 1,
                        pl: 7 // Align with the text
                      }}>
                        <Chip
                          label={collaborator.role}
                          color={getChipColor(collaborator.role)}
                          size="small"
                        />
                        <Typography variant="caption" color={collaborator.active ? "success.main" : "error.main"}>
                          {collaborator.active ? "Activo" : "Inactivo"}
                        </Typography>
                      </Box>
                    )}
                    
                    <ListItemSecondaryAction sx={{ 
                      display: "flex", 
                      alignItems: "center",
                      position: isMobile ? 'relative' : 'absolute',
                      right: isMobile ? 'auto' : theme.spacing(2),
                      top: isMobile ? 'auto' : '50%',
                      transform: isMobile ? 'none' : 'translateY(-50%)',
                      width: isMobile ? '100%' : 'auto',
                      justifyContent: isMobile ? 'flex-end' : 'flex-end',
                      mt: isMobile ? 1 : 0,
                      borderTop: isMobile ? `1px solid ${theme.palette.divider}` : 'none',
                      pt: isMobile ? 1 : 0
                    }}>
                      {/* Desktop-only role chip */}
                      {!isMobile && (
                        <>
                          <Chip
                            label={collaborator.role}
                            color={getChipColor(collaborator.role)}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            label={collaborator.active ? "Activo" : "Inactivo"}
                            color={collaborator.active ? "success" : "error"}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                        </>
                      )}
                      
                      <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Editar">
                          <IconButton 
                            aria-label="editar colaborador" 
                            onClick={() => handleEditClick(collaborator)}
                            size={isTablet ? "small" : "medium"}
                          >
                            <EditIcon fontSize={isTablet ? "small" : "medium"} />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Eliminar">
                          <IconButton 
                            aria-label="eliminar colaborador" 
                            onClick={() => handleDelete(collaborator.id)}
                            size={isTablet ? "small" : "medium"}
                          >
                            <DeleteIcon fontSize={isTablet ? "small" : "medium"} />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Más opciones">
                          <IconButton 
                            edge="end" 
                            aria-label="opciones"
                            onClick={(e) => handleMenuOpen(e, collaborator)}
                            size={isTablet ? "small" : "medium"}
                          >
                            <MoreVertIcon fontSize={isTablet ? "small" : "medium"} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              {/* Add divider between role groups */}
              {roleIndex < Object.entries(groupedCollaborators).length - 1 && 
                Object.entries(groupedCollaborators)[roleIndex + 1][1].length > 0 && 
                <Divider />
              }
            </Box>
          )
        ))}
      </Paper>

      {/* Floating Action Button for mobile */}
      <Fab 
        color="primary" 
        aria-label="add"
        onClick={handleAddClick}
        sx={{ 
          position: 'fixed', 
          bottom: theme.spacing(3), 
          right: theme.spacing(3),
          display: { xs: 'flex', sm: 'none' }
        }}
      >
        <AddIcon />
      </Fab>

      {/* Options Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleToggleActive}>
          <BlockIcon fontSize="small" sx={{ mr: 1 }} />
          {currentCollaborator?.active ? "Inhabilitar" : "Habilitar"}
        </MenuItem>
        <MenuItem onClick={handleRoleChangeClick}>
          <SwapHorizIcon fontSize="small" sx={{ mr: 1 }} />
          Cambiar rol
        </MenuItem>
      </Menu>

      {/* Add/Edit Modal */}
      <Dialog 
        open={modalOpen} 
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <DialogTitle>{isEditing ? "Editar Colaborador" : "Agregar Usuario"}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="name"
                label="Nombre"
                value={formData.name}
                onChange={handleFormChange}
                fullWidth
                variant="outlined"
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleFormChange}
                fullWidth
                variant="outlined"
                type="email"
                required
              />
            </Box>
            <Box>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="role-select-label">Rol</InputLabel>
                <Select
                  labelId="role-select-label"
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange as any}
                  label="Rol"
                >
                  <MenuItem value="SUPER ADMIN">SUPER ADMIN</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="USER">USER</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="inherit">Cancelar</Button>
          <Button 
            onClick={handleFormSubmit} 
            color="primary" 
            variant="contained"
            disabled={!formData.name || !formData.email}
          >
            {isEditing ? "Guardar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Role Modal */}
      <Dialog 
        open={roleModalOpen} 
        onClose={handleRoleModalClose}
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
      >
        <DialogTitle>Cambiar Rol</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
            <InputLabel id="new-role-select-label">Nuevo Rol</InputLabel>
            <Select
              labelId="new-role-select-label"
              value={newRole}
              onChange={handleRoleChange}
              label="Nuevo Rol"
            >
              <MenuItem value="SUPER ADMIN">SUPER ADMIN</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoleModalClose} color="inherit">Cancelar</Button>
          <Button onClick={handleRoleSubmit} color="primary" variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Collaborators;