"use client"

import { useState } from "react"
import { Box, Typography, IconButton, useTheme, Modal, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FavoriteIcon from "@mui/icons-material/Favorite"
import WatchLaterIcon from "@mui/icons-material/WatchLater"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import { Video } from "../../features/interfaces/video"
import { videos } from "../../features/data/videos-data"
import VideoCarousel from "../../components/videos/VideoCarousel"
import UserInfo from "../../components/videos/UserInfoCard"
import VideoCard from "../../components/videos/VideoCard"

// Datos de ejemplo para el video destacado
const featuredVideo: Video = {
  id: 0,
  title: "Video destacado de la semana",
  thumbnail: "/img/imageDashboard.jpg",
  author: "Juanito Edulink",
  avatar: "/img/imageDashboard.jpg",
  role: "Profesor Principal",
  description: "Este es el video destacado de la semana. Aprende los conceptos más importantes.",
  viewedAt: new Date(),
  duration: "10:30",
  category: "Destacado",
}

// Obtener los primeros 8 videos para mostrar en la página de inicio
const homeVideos = videos.slice(0, 8).map((video, index) => ({
  ...video,
  title: `${video.title} - Recomendado`, // Personalizar el título para la página de inicio
}))

const HomePage = () => {
  const theme = useTheme()

  // Estados para la visualización de video
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  // Estado para el menú de opciones (3 puntos)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null)

  // Abrir video en pantalla completa
  const handleOpenVideo = (video: Video) => {
    setSelectedVideo(video)
    setIsMinimized(false)
  }

  // Cerrar video
  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  // Cambiar entre vista miniatura y pantalla completa
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // Determinar si un recurso es un video MP4
  const isVideoFile = (filename: string) => {
    return filename.toLowerCase().endsWith(".mp4")
  }

  // Funciones para el menú de opciones
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, videoId: number) => {
    event.stopPropagation() // Prevenir que se abra el video
    setMenuAnchorEl(event.currentTarget)
    setActiveVideoId(videoId)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  const handleAddToFavorites = () => {
    console.log(`Añadido a favoritos: Video ID ${activeVideoId}`)
    handleCloseMenu()
  }

  const handleWatchLater = () => {
    console.log(`Guardado para ver más tarde: Video ID ${activeVideoId}`)
    handleCloseMenu()
  }

  const handleLikeVideo = () => {
    console.log(`Me gusta añadido: Video ID ${activeVideoId}`)
    handleCloseMenu()
  }

  return (
    <Box
      sx={{
        pt: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2, md: 3 },
        position: "relative",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
        }}
      >
        Contenido educativo Recientes
      </Typography>

      {/* Carrusel de video destacado - responsive height */}
      <VideoCarousel video={featuredVideo} height={{ xs: 150, sm: 180, md: 200, lg: 220 }} />

      {/* Información del autor del video destacado con menú de opciones */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: { xs: 1, sm: 1.5 }, mb: { xs: 2, sm: 3 } }}>
        <UserInfo
          author={featuredVideo.author}
          avatar={featuredVideo.avatar || ""}
          title={featuredVideo.title}
        />
        
        {/* Botón de 3 puntos para el video destacado */}
        <Tooltip title="Opciones">
          <IconButton onClick={(e) => handleOpenMenu(e, featuredVideo.id)}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Videos usando Flexbox en lugar de Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        {homeVideos.map((video) => (
          <Box
            key={video.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(50% - 24px)",
                lg: "calc(33.333% - 24px)",
                xl: "calc(25% - 24px)",
              },
              mb: { xs: 2, sm: 0 },
              transition: "transform 0.2s ease-in-out",
              position: "relative", // Para posicionar el botón de opciones
              "&:hover": {
                transform: "translateY(-2px)",
                cursor: "pointer",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              {/* Botón de 3 puntos para cada video */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.7)",
                  },
                  zIndex: 2,
                }}
                onClick={(e) => handleOpenMenu(e, video.id)}
              >
                <MoreVertIcon sx={{ color: "white" }} />
              </IconButton>
              
              <VideoCard video={video} isVideo={isVideoFile(video.thumbnail)} onClick={() => handleOpenVideo(video)} />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Menú de opciones (aparece al hacer clic en los 3 puntos) */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAddToFavorites}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Añadir a Favoritos</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleWatchLater}>
          <ListItemIcon>
            <WatchLaterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver más tarde</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLikeVideo}>
          <ListItemIcon>
            <ThumbUpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Me gusta</ListItemText>
        </MenuItem>
      </Menu>

      {/* Modal para vista de video (más pequeño) */}
      <Modal
        open={selectedVideo !== null && !isMinimized}
        onClose={handleCloseVideo}
        aria-labelledby="video-modal-title"
        aria-describedby="video-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%" },
            maxWidth: "800px",
            maxHeight: "90vh",
            backgroundColor: theme.palette.background.paper,
            boxShadow: 24,
            p: { xs: 1, sm: 2 },
            borderRadius: 1,
            outline: "none",
            position: "relative",
            overflow: "auto",
          }}
        >
          {selectedVideo && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography
                  id="video-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    fontWeight: "medium",
                  }}
                >
                  {selectedVideo.title}
                </Typography>
                <Box>
                  <Tooltip title="Opciones">
                    <IconButton 
                      onClick={(e) => handleOpenMenu(e, selectedVideo.id)} 
                      size="small" 
                      sx={{ mr: 0.5 }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Minimizar">
                    <IconButton onClick={toggleMinimize} size="small" sx={{ mr: 0.5 }}>
                      <PictureInPictureIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cerrar">
                    <IconButton onClick={handleCloseVideo} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Contenedor del video - tamaño reducido */}
              <Box
                sx={{
                  width: "100%",
                  height: 0,
                  paddingBottom: "56.25%", // Proporción 16:9
                  position: "relative",
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                {isVideoFile(selectedVideo.thumbnail) ? (
                  <Box
                    component="video"
                    src={selectedVideo.thumbnail}
                    controls
                    autoPlay
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
              </Box>

              {/* Información reducida */}
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={selectedVideo.avatar}
                  alt={selectedVideo.author}
                  sx={{
                    width: { xs: 30, sm: 36 },
                    height: { xs: 30, sm: 36 },
                    borderRadius: "50%",
                    mr: 1.5,
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                    {selectedVideo.author}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                    Duración: {selectedVideo.duration}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Ventana minimizada */}
      {selectedVideo && isMinimized && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 280,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 6,
            borderRadius: 1,
            zIndex: 1300,
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative" }}>
            {/* Barra de título de la ventana minimizada */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                backgroundColor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="body2" noWrap sx={{ maxWidth: 180 }}>
                {selectedVideo.title}
              </Typography>
              <Box>
                <Tooltip title="Opciones">
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleOpenMenu(e, selectedVideo.id)} 
                    sx={{ mr: 0.5 }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Expandir">
                  <IconButton size="small" onClick={toggleMinimize} sx={{ mr: 0.5 }}>
                    <FullscreenIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cerrar">
                  <IconButton size="small" onClick={handleCloseVideo}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Contenido del video minimizado */}
            {isVideoFile(selectedVideo.thumbnail) ? (
              <Box
                component="video"
                src={selectedVideo.thumbnail}
                muted
                autoPlay
                loop
                sx={{
                  width: "100%",
                  height: 158,
                  objectFit: "cover",
                }}
                onClick={toggleMinimize}
              />
            ) : (
              <Box
                component="img"
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                sx={{
                  width: "100%",
                  height: 158,
                  objectFit: "cover",
                }}
                onClick={toggleMinimize}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default HomePage