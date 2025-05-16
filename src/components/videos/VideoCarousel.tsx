import { Box } from "@mui/material"
import { Video } from "../../features/interfaces/video"

export interface VideoCarouselProps {
  image?: string
  video?: Video
  height?: number | { [key: string]: number }
  isVideo?: boolean
}

export const VideoCarousel = ({ image, video, height = 200, isVideo = false }: VideoCarouselProps) => {
  // Determinar la fuente de la imagen/video
  const src = video ? video.thumbnail : image
  const title = video ? video.title : "Video"

  // Si no hay src, no renderizar nada
  if (!src) return null

  // Asegúrate de que heightValue sea un número o un string
  const heightValue: string | number = typeof height === "number" ? height : height["default"] || 200 // Usa un valor por defecto si es un objeto

  // Determinar si es un video basado en la extensión o la prop isVideo
  const isVideoContent = isVideo || (src && src.toLowerCase().endsWith(".mp4"))

  if (isVideoContent) {
    return (
      <Box
        component="video"
        controls
        sx={{
          width: "100%",
          height: heightValue,
          borderRadius: { xs: 2, sm: 3 },
          overflow: "hidden",
          objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: heightValue,
        borderRadius: { xs: 2, sm: 3 },
        overflow: "hidden",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        alt: title,
      }}
    />
  )
}

export default VideoCarousel
