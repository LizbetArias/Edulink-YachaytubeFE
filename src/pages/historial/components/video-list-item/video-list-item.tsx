"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import { Share, GetApp, Delete, MoreVert, PlayCircle } from "@mui/icons-material"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Video } from "../../../../features/interfaces/video"

interface VideoListItemProps {
  video: Video
  onOpenVideo: (video: Video) => void
}

export const VideoListItem = ({ video, onOpenVideo }: VideoListItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteVideo = () => {
    // Lógica para eliminar el video del historial
    handleMenuClose()
  }

  // Función para formatear la hora
  const formatTime = (date: Date) => {
    return format(date, "HH:mm", { locale: es })
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: (theme) =>
          theme.palette.mode === "dark" ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark" ? "0 4px 8px rgba(0,0,0,0.4)" : "0 4px 8px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Miniatura con duración */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 200, md: 220 },
          height: { xs: 180, sm: 112, md: 124 },
          flexShrink: 0,
          cursor: "pointer",
          overflow: "hidden", // Asegura que el video no se salga del contenedor
        }}
        onClick={() => onOpenVideo(video)}
      >
        {/* Usar video como thumbnail */}
        <Box
          component="video"
          src={video.thumbnail}
          muted // Importante para que no reproduzca sonido como thumbnail
          autoPlay={false} // No reproducir automáticamente
          loop // Bucle opcional
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.7)",
            color: "white",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {video.duration}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.2s",
            background: "rgba(0,0,0,0.5)",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <PlayCircle sx={{ fontSize: 48, color: "white" }} />
        </Box>
      </Box>

      {/* Información del video */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          p: 2,
          width: "100%",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              sx={{
                lineHeight: 1.3,
                mb: 1,
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                cursor: "pointer",
              }}
              onClick={() => onOpenVideo(video)}
            >
              {video.title}
            </Typography>
            <Box sx={{ flexShrink: 0 }}>
              <Tooltip title="Opciones">
                <IconButton size="small" onClick={handleMenuOpen}>
                  <MoreVert fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Avatar
              src={video.avatar}
              alt={video.author}
              sx={{
                width: 24,
                height: 24,
                mr: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {video.author}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                mx: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              •
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              {video.role}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              display: { xs: "none", md: "block" },
              color: "text.secondary",
              opacity: 0.8,
              mb: 1,
              lineHeight: 1.4,
            }}
          >
            {video.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 1, md: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={video.category}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.06)",
                fontSize: "0.7rem",
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {formatTime(video.viewedAt)}
            </Typography>
          </Box>

          <Box
            sx={{
              gap: 1,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Tooltip title="Compartir">
              <IconButton size="small">
                <Share fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Descargar">
              <IconButton size="small">
                <GetApp fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar del historial">
              <IconButton size="small">
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Menú de opciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
        <MenuItem onClick={handleDeleteVideo}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Eliminar del historial</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default VideoListItem
