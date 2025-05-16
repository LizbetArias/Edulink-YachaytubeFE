import React, { useState, useEffect } from "react";
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
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Stack
} from "@mui/material";
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Edit as EditIcon, 
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon
} from "@mui/icons-material";

// Types for our data
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  users: User[];
}

// Main Teams component
const Teams: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // States
  const [teams, setTeams] = useState<Team[]>([]);
  const [openTeamDialog, setOpenTeamDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [newUser, setNewUser] = useState<User>({ id: "", name: "", email: "", avatar: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  
  // Load sample data
  useEffect(() => {
    // Simulate data loading
    const mockTeams: Team[] = [
      {
        id: "1",
        name: "Teams Logística",
        users: [
          { id: "1", name: "Francis Pacheco Lumo", email: "francis.lumo@yachaydata.edu.pe", avatar: "/avatar1.jpg" },
          { id: "2", name: "Francis Pacheco Lumo", email: "francis.lumo@yachaydata.edu.pe", avatar: "/avatar1.jpg" },
          { id: "3", name: "Francis Pacheco Lumo", email: "francis.lumo@yachaydata.edu.pe", avatar: "/avatar1.jpg" }
        ]
      },
      {
        id: "2",
        name: "Teams Logística",
        users: [
          { id: "4", name: "Francis Pacheco Lumo", email: "francis.lumo@yachaydata.edu.pe", avatar: "/avatar1.jpg" },
          { id: "5", name: "Francis Pacheco Lumo", email: "francis.lumo@yachaydata.edu.pe", avatar: "/avatar1.jpg" }
        ]
      }
    ];
    
    setTeams(mockTeams);
  }, []);
  
  // Team management functions
  const handleOpenTeamDialog = (team?: Team) => {
    if (team) {
      setCurrentTeam(team);
      setTeamName(team.name);
      setIsEditing(true);
    } else {
      setCurrentTeam(null);
      setTeamName("");
      setIsEditing(false);
    }
    setOpenTeamDialog(true);
  };
  
  const handleCloseTeamDialog = () => {
    setOpenTeamDialog(false);
  };
  
  const handleSaveTeam = () => {
    if (teamName.trim() === "") {
      setSnackbar({ open: true, message: "El nombre del equipo es requerido", severity: "error" });
      return;
    }
    
    if (isEditing && currentTeam) {
      // Update existing team
      setTeams(teams.map(team => 
        team.id === currentTeam.id ? { ...team, name: teamName } : team
      ));
      setSnackbar({ open: true, message: "Equipo actualizado correctamente", severity: "success" });
    } else {
      // Create new team
      const newTeam: Team = {
        id: Date.now().toString(),
        name: teamName,
        users: []
      };
      setTeams([...teams, newTeam]);
      setSnackbar({ open: true, message: "Equipo creado correctamente", severity: "success" });
    }
    
    handleCloseTeamDialog();
  };
  
  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
    setSnackbar({ open: true, message: "Equipo eliminado correctamente", severity: "success" });
  };
  
  // User management functions
  const handleOpenUserDialog = (team: Team) => {
    setCurrentTeam(team);
    setNewUser({ id: "", name: "", email: "", avatar: "" });
    setOpenUserDialog(true);
  };
  
  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };
  
  const handleAddUser = () => {
    if (!currentTeam || !newUser.name || !newUser.email) {
      setSnackbar({ open: true, message: "Nombre y email son requeridos", severity: "error" });
      return;
    }
    
    const updatedUser = {
      ...newUser,
      id: Date.now().toString(),
      avatar: `/api/placeholder/40/40`
    };
    
    // Update team with new user
    const updatedTeams = teams.map(team => {
      if (team.id === currentTeam.id) {
        return {
          ...team,
          users: [...team.users, updatedUser]
        };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    setSnackbar({ open: true, message: "Usuario agregado correctamente", severity: "success" });
    handleCloseUserDialog();
  };
  
  const handleRemoveUser = (teamId: string, userId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          users: team.users.filter(user => user.id !== userId)
        };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    setSnackbar({ open: true, message: "Usuario eliminado correctamente", severity: "success" });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          <GroupIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Gestiona grupos de estdudio
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenTeamDialog()}
        >
          Agregar Grupo
        </Button>
      </Box>
      
      {/* Team list */}
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={3}>
          {teams.map(team => (
            <Paper 
              key={team.id}
              elevation={3} 
              sx={{ 
                borderRadius: 2,
                backgroundColor: "rgba(38, 38, 38, 0.9)", 
                color: "white",
                overflow: "hidden"
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Typography variant="h6">{team.name}</Typography>
                <Box>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleOpenTeamDialog(team)}
                    sx={{ color: "white" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteTeam(team.id)}
                    sx={{ color: "white" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
              
              {/* User list */}
              <List>
                {team.users.map(user => (
                  <ListItem key={user.id}>
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={`/api/placeholder/40/40`} />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={user.name} 
                      secondary={
                        <Typography component="span" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          {user.email}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Chip 
                        label="USER" 
                        color="success" 
                        size="small" 
                        sx={{ mr: 1 }}
                      />
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveUser(team.id, user.id)}
                        sx={{ color: "white" }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              {/* Add user button */}
              <Box p={2} textAlign="center">
                <Button 
                  variant="outlined" 
                  startIcon={<PersonAddIcon />}
                  onClick={() => handleOpenUserDialog(team)}
                  sx={{ 
                    borderRadius: 8,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }
                  }}
                >
                  Agregar
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
      
      {/* Team dialog */}
      <Dialog open={openTeamDialog} onClose={handleCloseTeamDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {isEditing ? "Editar Grupo" : "Agregar Grupo"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Grupo"
            type="text"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTeamDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveTeam} color="primary" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* User dialog */}
      <Dialog open={openUserDialog} onClose={handleCloseUserDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Agregar Usuario a {currentTeam?.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre completo"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Correo electrónico"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddUser} color="primary" variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Teams;