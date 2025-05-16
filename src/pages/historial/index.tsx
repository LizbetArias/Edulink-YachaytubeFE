"use client"

import { useState } from "react"
import { Box, Typography, Button, IconButton } from "@mui/material"
import { History as HistoryIcon, FilterList as FilterIcon } from "@mui/icons-material"

// Importar componentes y utilidades
import { DateGroup } from "./components/date-group/date-group"
import { VideoPlayer } from "./components/video-player/video-player"
import { groupVideosByDate } from "./utils/date-utils"
import { Video } from "../../features/interfaces/video"
import { getHistorialVideos } from "../../features/data/videos-data"

const HistorialPage = () => {
  const historialVideos = getHistorialVideos()
  const groupedVideos = groupVideosByDate(historialVideos)

  // Estados para la visualización de video
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullScreenMode, setIsFullScreenMode] = useState(false)

  // Abrir video en pantalla completa
  const handleOpenVideo = (video: Video) => {
    setSelectedVideo(video)
    setIsFullScreenMode(true)
    setIsMinimized(false)
  }

  // Cerrar video y volver al historial
  const handleCloseVideo = () => {
    setSelectedVideo(null)
    setIsFullScreenMode(false)
    setIsMinimized(false)
  }

  // Cambiar entre vista miniatura y pantalla completa
  const toggleMinimize = () => {
    if (isMinimized) {
      // Si ya está minimizado y se hace clic, expandir a pantalla completa
      setIsMinimized(false)
      setIsFullScreenMode(true)
    } else {
      // Si está en pantalla completa y se hace clic, minimizar
      setIsMinimized(true)
      setIsFullScreenMode(false)
    }
  }

  // Si estamos en modo de video a pantalla completa, mostrar solo la interfaz de reproducción
  if (isFullScreenMode && selectedVideo && !isMinimized) {
    return (
      <VideoPlayer
        video={selectedVideo}
        isMinimized={false}
        onClose={handleCloseVideo}
        onToggleMinimize={toggleMinimize}
      />
    )
  }

  // Vista normal del historial
  return (
    <Box sx={{ pt: { xs: 1, sm: 2 }, px: { xs: 1, sm: 2, md: 3 }, position: "relative" }}>
      {/* Encabezado con título y filtros */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HistoryIcon color="action" />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            Historial de reproducciones
          </Typography>
        </Box>

        <Button
          startIcon={<FilterIcon />}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 6,
            textTransform: "none",
            display: { xs: "none", sm: "flex" },
          }}
        >
          Filtrar
        </Button>

        <IconButton sx={{ display: { xs: "flex", sm: "none" } }} size="small">
          <FilterIcon />
        </IconButton>
      </Box>

      {/* Contenido principal */}
      {Object.entries(groupedVideos).map(([date, videos]) => (
        <DateGroup key={date} date={date} videos={videos} onOpenVideo={handleOpenVideo} />
      ))}

      {/* Mensaje si el historial está vacío */}
      {Object.keys(groupedVideos).length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
          }}
        >
          <HistoryIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Tu historial está vacío
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Los videos que veas aparecerán aquí para que puedas retomar desde donde los dejaste.
          </Typography>
          <Button variant="contained" color="primary">
            Explorar videos
          </Button>
        </Box>
      )}

      {/* Ventana minimizada */}
      {selectedVideo && isMinimized && (
        <VideoPlayer
          video={selectedVideo}
          isMinimized={true}
          onClose={handleCloseVideo}
          onToggleMinimize={toggleMinimize}
        />
      )}
    </Box>
  )
}

export default HistorialPage
