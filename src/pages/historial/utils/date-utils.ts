import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Video } from "../../../features/interfaces/video"

// Función para formatear la hora
export const formatTime = (date: Date) => {
  return format(date, "HH:mm", { locale: es })
}

// Función para agrupar videos por fecha
export const groupVideosByDate = (videos: Video[]) => {
  const grouped: { [key: string]: Video[] } = {}

  videos.forEach((video) => {
    const dateKey = format(video.viewedAt, "d 'de' MMMM yyyy", { locale: es })
    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(video)
  })

  return grouped
}
