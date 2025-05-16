// Interfaz común para videos en toda la aplicación
export interface Video {
  id: number
  title: string
  thumbnail: string
  author: string
  avatar?: string
  role: string
  description: string
  viewedAt: Date
  duration: string
  category: string
}
