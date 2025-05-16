// IMPORTACIONES
import React, { useState, useEffect } from "react";
import { Lista as IVideo } from "../../../features/interfaces/lista";
import MyList from './my-list/MyList';
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
  Modal,
  Checkbox,
} from "@mui/material";
import {
  MoreVert,
  Share,
  GetApp,
  Delete,
  PlayCircleOutline,
  VideoLibrary,
  Add,
  ArrowBack,
} from "@mui/icons-material";
import { format } from "date-fns";
import CloseIcon from '@mui/icons-material/Close';

// INTERFAZ DE PROPS
interface FavoritosProps {
  initialVideos: (IVideo & {
    viewedAt: Date;
    duration: string;
    group_list: string;
  })[];
  onDelete: (videoId: number) => void;
}

// COMPONENTE PRINCIPAL
const Favoritos: React.FC<FavoritosProps> = ({ initialVideos, onDelete }) => {
  // ESTADO PARA LOS VIDEOS
  const [videos, setVideos] = useState(initialVideos);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuVideoId, setMenuVideoId] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState(""); // ESTADO PARA EL FILTRO
  const [showMyList, setShowMyList] = useState(false); // ESTADO PARA MOSTRAR MyList
  const [openModal, setOpenModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);

  // USE EFFECT PARA FILTRAR VIDEOS
  useEffect(() => {
    handleSearch();
  }, [videos, searchFilter]); // Se actualiza al cambiar videos o el filtro

  // MANEJO DE REDIRECCIÓN A MyList
  const handleRedirectToMyList = () => {
    setShowMyList(true);
  };

  // MANEJO DE RETROCESO A FAVORITOS
  const handleBackToFavorites = () => {
    setShowMyList(false);
  };

  // FILTRO DE BUSQUEDA
  const [filteredVideos, setFilteredVideos] = useState(initialVideos); // ESTADO PARA VIDEOS FILTRADOS

  // FILTRO POR TITLE Y AUTHOR
  const handleSearch = () => {
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      video.author.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  // MANEJO DEL MODAL
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // CERRAR EL MODAL
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewListName("");
    setSelectedVideos([]);
  };

  // CREAR NUEVA LISTA
  const handleCreateList = () => {
    const updatedVideos = videos.map((video) => {
      if (selectedVideos.includes(video.id)) {
        // Asignar el nombre de la nueva lista
        return { ...video, group_list: newListName };
      }
      return video;
    });

    // Actualizar el estado de videos
    setVideos(updatedVideos);
    console.log("Nueva lista creada:", newListName, selectedVideos);
    handleCloseModal();
  };

  // VIDEOS DISPONIBLES PARA EL MODAL
  const availableVideos = videos.filter(
    (video) => video.Favorites_list === "true" && video.group_list === ""
  );

  // MANEJO DEL MENÚ
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    videoId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuVideoId(videoId);
  };

  // CERRAR EL MENÚ
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuVideoId(null);
  };

  // ELIMINAR VIDEO
  const handleDeleteVideo = (videoId: number) => {
    onDelete(videoId);
    const updatedVideos = videos.filter(video => video.id !== videoId);
    setVideos(updatedVideos);
    handleMenuClose();
  };

  // RENDERIZACIÓN DEL COMPONENTE
  return (
    <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
      {/* FILTRO DE BÚSQUEDA Y BOTÓN */}
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center" gap={1}>
        <TextField
          variant="outlined"
          label="Filtro de Busqueda"
          size="small"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          sx={{ width: { xs: '100%', sm: 200 } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Buscar
        </Button>

        <Box display="flex" marginLeft="auto" gap={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={showMyList ? <ArrowBack /> : <VideoLibrary />}
            onClick={showMyList ? handleBackToFavorites : handleRedirectToMyList}
          >
            {showMyList ? "Todos" : "Mis Listas"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Nueva Lista
          </Button>
        </Box>
      </Box>

      {/* MODAL PARA CREAR NUEVA LISTA */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              position: 'relative', // Para posicionar el botón de cerrar
              padding: 3,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3, 
              width: { xs: '90%', sm: 400 },
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'text.secondary' // Color del icono
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Crear Nueva Lista</Typography>
            <TextField
              label="Nombre de la Lista"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              fullWidth
              size="small"
              margin="normal"
            />
            {availableVideos.map((video) => (
              <Box key={video.id} display="flex" alignItems="center" marginBottom={1}>
                <Checkbox
                  checked={selectedVideos.includes(video.id)}
                  onChange={() => {
                    setSelectedVideos((prev) =>
                      prev.includes(video.id)
                        ? prev.filter((id) => id !== video.id)
                        : [...prev, video.id]
                    );
                  }}
                />
                <CardMedia
                  component="img"
                  image={video.thumbnail}
                  alt={video.title}
                  sx={{ width: 50, height: 50, borderRadius: 1, marginRight: 1 }} // Tamaño y margen para el thumbnail
                />
                <Box>
                  <Typography variant="body2" fontWeight="bold">{video.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{video.author}</Typography>
                </Box>
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateList}
              sx={{ marginTop: 2 }}
            >
              Crear Lista
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* RENDERIZACIÓN DE VIDEOS */}
      {showMyList ? (
        <MyList videos={videos} />
      ) : (
        filteredVideos.map((video) => (
          <Paper key={video.id} elevation={3} sx={{ boxShadow: 'none' }}>
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
              <Box position="relative" sx={{ width: { xs: '100%', sm: 160 }, height: { xs: 'auto', sm: 120 } }}>
                <CardMedia
                  component="img"
                  image={video.thumbnail}
                  alt={video.title}
                  sx={{ borderRadius: 1, width: '100%', height: '100%', objectFit: 'cover' }}
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
                    }} />
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
                  <Chip
                    label={`Lista: ${video.group_list}`}
                    size="small"
                    color="default"
                  />
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
              <Divider />
              <MenuItem onClick={() => handleDeleteVideo(video.id)}>
                <ListItemIcon>
                  <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText>Eliminar de favoritos</ListItemText>
              </MenuItem>
            </Menu>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Favoritos;
