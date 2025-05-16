"use client"

import { Box, Typography, IconButton, Tooltip, useTheme, Avatar, Chip, Divider } from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  PictureInPicture as PictureInPictureIcon,
  Share,
  GetApp,
  Delete,
} from "@mui/icons-material"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Video } from "../../../../features/interfaces/video"

interface VideoPlayerProps {
  video: Video
  isMinimized: boolean
  onClose: () => void
  onToggleMinimize: () => void
}

export const VideoPlayer = ({ video, isMinimized, onClose, onToggleMinimize }: VideoPlayerProps) => {
  const theme = useTheme()

  if (isMinimized) {
    return (
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
              {video.title}
            </Typography>
            <Box>
              <Tooltip title="Expandir">
                <IconButton size="small" onClick={onToggleMinimize} sx={{ mr: 0.5 }}>
                  <PictureInPictureIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cerrar">
                <IconButton size="small" onClick={onClose}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Contenido del video minimizado */}
          <Box
            component="video"
            src={video.thumbnail}
            controls
            autoPlay
            sx={{
              width: "100%",
              height: 158,
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Barra superior con título y botón de regreso */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Tooltip title="Volver al historial">
          <IconButton onClick={onClose} sx={{ mr: 2 }} aria-label="Volver al historial">
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {video.title}
        </Typography>
        <Tooltip title="Minimizar">
          <IconButton onClick={onToggleMinimize} edge="end" aria-label="Minimizar">
            <PictureInPictureIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Área principal del video */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          bgcolor: theme.palette.mode === "dark" ? "#0f0f0f" : "#f9f9f9",
        }}
      >
        {/* Contenedor del video */}
        <Box
          sx={{
            width: "100%",
            bgcolor: "black",
            position: "relative",
            paddingTop: "56.25%", // Mantiene proporción 16:9
          }}
        >
          <Box
            component="video"
            src={video.thumbnail}
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
        </Box>

        {/* Información del video y acciones */}
        <Box
          sx={{
            p: 3,
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
          }}
        >
          <Typography variant="h5" fontWeight="medium" sx={{ mb: 2 }}>
            {video.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip label={video.category} size="small" sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
              <Typography variant="body2" color="text.secondary">
                Visto el {format(video.viewedAt, "d 'de' MMMM yyyy 'a las' HH:mm", { locale: es })}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Compartir">
                <IconButton>
                  <Share fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Descargar">
                <IconButton>
                  <GetApp fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar del historial">
                <IconButton>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Sección del autor */}
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
            <Avatar
              src={video.avatar}
              alt={video.author}
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                mr: 2,
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                {video.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {video.role}
              </Typography>
            </Box>
          </Box>

          {/* Descripción del video */}
          <Box sx={{ bgcolor: theme.palette.background.paper, p: 2, borderRadius: 1 }}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {video.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default VideoPlayer
