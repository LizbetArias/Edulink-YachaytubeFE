import { Video } from "../interfaces/video"


// Datos de ejemplo compartidos para toda la aplicación
export const videos: Video[] = [
  {
    id: 1,
    title: "Video de la historia de Machu Picchu",
    thumbnail: "/videos/php.mp4",
    author: "Francis Sanchez",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Cultura",
    description: "Aprende más sobre la historia y cultura de Machu Picchu, una de las maravillas del mundo moderno.",
    viewedAt: new Date(2025, 3, 15, 14, 30),
    duration: "15:45",
    category: "Historia",
  },
  {
    id: 2,
    title: "Explicación de la revolución Francesa",
    thumbnail: "https://imagekit.io/blog/content/images/size/w600/2024/03/Nextjs-Video-Player.png",
    author: "Francis Sanchez",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Cultura",
    description: "Conoce qué sucedió en Francia durante la revolución que cambió el curso de la historia europea.",
    viewedAt: new Date(2025, 3, 15, 10, 20),
    duration: "18:22",
    category: "Historia",
  },
  {
    id: 3,
    title: "Tipos de Lenguajes de programación",
    thumbnail: "https://www.xenonstack.com/hs-fs/hubfs/xenonstack-unit-testing-in-react.png?width=1280&height=720&name=xenonstack-unit-testing-in-react.png",
    author: "Erick Flores",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Programación",
    description: "Conoce qué lenguaje de programación se convertirá en tu favorito según tus intereses y necesidades.",
    viewedAt: new Date(2025, 3, 14, 18, 45),
    duration: "22:10",
    category: "Programación",
  },
  {
    id: 4,
    title: "Ecuaciones lineales para principiantes",
    thumbnail: "https://img.youtube.com/vi/5lek7Oe2rwg/hqdefault.jpg",
    author: "María Gómez",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesora de Matemáticas",
    description: "Aprende los conceptos básicos de las ecuaciones lineales de forma sencilla y práctica.",
    viewedAt: new Date(2025, 3, 13, 9, 15),
    duration: "14:30",
    category: "Matemáticas",
  },
  {
    id: 5,
    title: "Introducción a la física cuántica",
    thumbnail: "https://miro.medium.com/v2/resize:fit:700/0*TKd6lGfS5ESE2Y1Y.png",
    author: "Carlos Ramírez",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Física",
    description: "Una introducción accesible a los conceptos fundamentales de la física cuántica.",
    viewedAt: new Date(2025, 3, 12, 20, 30),
    duration: "24:15",
    category: "Ciencia",
  },
  // Añadimos videos para la categoría de matemáticas
  {
    id: 6,
    title: "Ecuaciones lineales - Introducción",
    thumbnail: "https://img.youtube.com/vi/YlUKcNNmywk/hqdefault.jpg",
    author: "EDteam",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Matemáticas",
    description: "Introducción a las ecuaciones lineales y sus propiedades básicas.",
    viewedAt: new Date(2025, 3, 10, 14, 30),
    duration: "15:00",
    category: "Matemáticas",
  },
  {
    id: 7,
    title: "Clasificación de ecuaciones",
    thumbnail: "/videos/matematica2.gif",
    author: "EDteam",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Matemáticas",
    description: "Aprende a clasificar diferentes tipos de ecuaciones matemáticas.",
    viewedAt: new Date(2025, 3, 9, 10, 20),
    duration: "16:30",
    category: "Matemáticas",
  },
  // Añadimos videos para la categoría de comunicación
  {
    id: 8,
    title: "Comprensión lectora",
    thumbnail: "/videos/3rNn.gif",
    author: "EDteam",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Comunicación",
    description: "Técnicas para mejorar la comprensión lectora en textos académicos.",
    viewedAt: new Date(2025, 3, 8, 15, 45),
    duration: "14:20",
    category: "Comunicación",
  },
  {
    id: 9,
    title: "Redacción de ensayos",
    thumbnail: "/videos/7IwL.gif",
    author: "EDteam",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Comunicación",
    description: "Aprende a estructurar y redactar ensayos académicos de calidad.",
    viewedAt: new Date(2025, 3, 7, 11, 30),
    duration: "18:45",
    category: "Comunicación",
  },
  // Añadimos un video para la categoría de ciencia
  {
    id: 10,
    title: "Método científico",
    thumbnail: "/videos/matematica4.gif",
    author: "EDteam",
    avatar: "/img/imageDashboard.jpg",
    role: "Profesor de Ciencias",
    description: "Introducción al método científico y su aplicación en investigaciones.",
    viewedAt: new Date(2025, 3, 6, 9, 15),
    duration: "09:30",
    category: "Ciencia",
  },
]

// Función para filtrar videos por categoría
export const getVideosByCategory = (category: string): Video[] => {
  return videos.filter((video) => video.category.toLowerCase() === category.toLowerCase())
}

// Función para obtener videos del historial (todos los videos ordenados por fecha)
export const getHistorialVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime())
}
