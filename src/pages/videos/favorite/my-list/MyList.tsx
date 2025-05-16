import React, { useState } from "react";
import { Lista as IVideo } from "../../../../features/interfaces/lista";
import {
  Box,
  Paper,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button, // Importar Button para el botón de guardar
} from "@mui/material";
import { format } from "date-fns";
import { Delete, GetApp, Share, Edit } from "@mui/icons-material"; // Importar Edit

interface MyListProps {
  videos: (IVideo & {
    viewedAt: Date;
    duration: string;
    group_list: string;
  })[];
}

const MyList: React.FC<MyListProps> = ({ videos }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuVideoId, setMenuVideoId] = useState<number | null>(null);
  const [videoList, setVideoList] = useState(videos);
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar el modal
  const [newGroupName, setNewGroupName] = useState<string>(""); // Estado para el nuevo nombre del grupo
  const [editingGroup, setEditingGroup] = useState<string>(""); // Estado para el grupo que se está editando

  // Filtrar videos que son favoritos
  const filteredVideos = videoList.filter(video => 
    video.Favorites_list === "true" && video.group_list !== ""
  );

  // Agrupar videos por group_list
  const groupedVideos = filteredVideos.reduce((acc, video) => {
    const group = video.group_list;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(video);
    return acc;
  }, {} as Record<string, IVideo[]>);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, videoId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuVideoId(videoId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuVideoId(null);
  };

  const handleDeleteVideo = (videoId: number) => {
    setVideoList(prevVideos => 
      prevVideos.map(video => 
        video.id === videoId ? { ...video, group_list: "" } : video
      )
    );
    console.log(`Eliminar video con ID: ${videoId}`);
    handleMenuClose();
  };

  const handleEditGroupName = () => {
    setVideoList(prevVideos => 
      prevVideos.map(video => 
        video.group_list === editingGroup ? { ...video, group_list: newGroupName } : video
      )
    );
    setNewGroupName(""); // Limpiar el campo de entrada
    setOpenDialog(false); // Cerrar el modal
  };

  const openEditDialog = (group: string) => {
    setEditingGroup(group);
    setNewGroupName(group); // Prellenar el campo con el nombre actual
    setOpenDialog(true); // Abrir el modal
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
      {Object.keys(groupedVideos).length === 0 ? (
        <Typography variant="h6">No hay videos en esta lista.</Typography>
      ) : (
        Object.entries(groupedVideos).map(([group, videos]) => (
          <Paper key={group} elevation={3} sx={{ boxShadow: 'none', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {group} ({videos.length})
              <Button
                onClick={() => openEditDialog(group)} // Abrir el modal al hacer clic
                size="small"
                startIcon={<Edit />}
                sx={{ marginLeft: 1 }} // Espaciado
              >
                Editar
              </Button>
            </Typography>
            {videos.length > 2 && (
              <Typography variant="body2" color="text.secondary">
                Este grupo contiene más de 2 videos.
              </Typography>
            )}
            {videos.map(video => (
              <Box key={video.id} display="flex" alignItems="center" mb={2}>
                <Box position="relative">
                  <CardMedia
                    component="img"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{ width: 160, height: 120, borderRadius: 1 }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "2px 4px",
                      borderRadius: 1,
                      fontSize: "12px",
                    }}
                  >
                    {video.duration}
                  </Box>
                </Box>
                <CardContent sx={{ flex: 1, padding: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.author}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Chip
                      label={format(video.viewedAt, "dd/MM/yyyy HH:mm")}
                      size="small"
                    />
                    <Chip
                      label={`Lista: ${video.group_list}`}
                      size="small"
                      color="default"
                    />
                  </Box>
                  <Box mt={1}>
                    <Typography
                      variant="body2"
                      color="primary"
                      onClick={(event) => handleMenuOpen(event, video.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      Opciones
                    </Typography>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuVideoId === video.id}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        minWidth: 180,
                        borderRadius: 2,
                        mt: 1,
                      },
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <Share fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Compartir</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <GetApp fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Descargar</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleDeleteVideo(video.id)}>
                      <ListItemIcon>
                        <Delete fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Quitar de la lista</ListItemText>
                    </MenuItem>
                  </Menu>
                </CardContent>
              </Box>
            ))}
            <Divider />
          </Paper>
        ))
      )}

      {/* Modal para editar el nombre del grupo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Editar Nombre del Grupo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nuevo Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleEditGroupName} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyList;
