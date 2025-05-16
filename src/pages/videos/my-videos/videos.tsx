// src/pages/videos/my-videos/videos.tsx

import React from "react";
import { Lista as IVideo, Lista } from "../../../features/interfaces/lista";
import {
  Box,
  Paper,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Chip,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
} from "@mui/material";
import {
  MoreVert,
  Share,
  GetApp,
  Delete,
  PlayCircleOutline,
  Videocam,
  EditNote,
} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from "date-fns";
import ModalCreate from "./modal-upload/modal-create"; // Importar modal de creación
import ModalEdit from "./modal-upload/modal-edit"; // Importar modal de edición

interface MisVideosProps {
  videos: (IVideo & {
    viewedAt: Date;
    duration: string;
  })[];
  onDelete: (videoId: number) => void;
  categories: string[]; // Agregamos un prop para las categorías
}

const MisVideos: React.FC<MisVideosProps> = ({ videos, onDelete, categories }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuVideoId, setMenuVideoId] = React.useState<number | null>(null);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState<IVideo | null>(null);
  const [videoList, setVideoList] = React.useState(videos);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, videoId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuVideoId(videoId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuVideoId(null);
  };

  const handleDeleteVideo = (videoId: number) => {
    // Actualizar el estado del video para simular la eliminación
    setVideoList((prevVideos) => {
      return prevVideos.map(video => {
        if (video.id === videoId) {
          return { ...video, MyVideos_list: "false" }; // Establecer MyVideos_list en false
        }
        return video;
      });
    });
    handleMenuClose();
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenEditModal = (video: IVideo) => {
    setSelectedVideo(video);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedVideo(null);
  };

  const handleSubmitCreate = (newVideoData: Lista) => {
    setVideoList((prevVideos) => [...prevVideos, newVideoData]);
  };

  const handleSubmitEdit = (updatedVideoData: Lista) => {
    setVideoList((prevVideos) => {
      const existingVideoIndex = prevVideos.findIndex(video => video.id === updatedVideoData.id);
      if (existingVideoIndex !== -1) {
        const updatedVideos = [...prevVideos];
        updatedVideos[existingVideoIndex] = updatedVideoData;
        return updatedVideos;
      }
      return prevVideos;
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center" gap={1}>
        <TextField
          variant="outlined"
          label="Filtro de Busqueda"
          size="small"
          sx={{ width: { xs: '100%', sm: 200 } }}
        />
        <Button
          variant="contained"
          color="primary"
        >
          Buscar
        </Button>
        <Box display="flex" marginLeft="auto" gap={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Videocam />}
            onClick={handleOpenCreateModal}
          >
            Subir Video
          </Button>
        </Box>
      </Box>

      <ModalCreate
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmitCreate}
        categories={categories}
      />

      {selectedVideo && (
        <ModalEdit
          open={openEditModal}
          onClose={handleCloseEditModal}
          video={selectedVideo}
          onSubmit={handleSubmitEdit}
          categories={categories}
        />
      )}

      {videoList.map((video) => (
        video.MyVideos_list === "true" && ( // Solo mostrar videos que están en MyVideos_list
          <Paper key={video.id} elevation={3} sx={{ boxShadow: 'none' }}>
            <Box display="flex" alignItems="center">
              <Box position="relative">
                <CardMedia
                  component="img"
                  image={video.thumbnail}
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
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                  }}
                >
                  <PlayCircleOutline
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      fontSize: "40px",
                      borderRadius: 10,
                    }}
                  />
                </IconButton>
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
                  <Button
                    size="small"
                    startIcon={<EditNote />}
                    sx={{ marginLeft: 1 }} // Espaciado
                    onClick={() => handleOpenEditModal(video)} // Abrir modal con datos del video
                  >
                    Editar
                  </Button>
                </Box>
              </CardContent>
              <IconButton
                onClick={(e) => handleMenuOpen(e, video.id)}
                sx={{ marginRight: 1 }}
              >
                <MoreVert />
              </IconButton>
            </Box>
            <Divider />
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
              <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Favoritos</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccessTimeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Ver más tarde</ListItemText>
            </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleDeleteVideo(video.id)}>
                <ListItemIcon>
                  <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText>Quitar Video</ListItemText>
              </MenuItem>
            </Menu>
          </Paper>
        )
      ))}
    </Box>
  );
};

export default MisVideos;
