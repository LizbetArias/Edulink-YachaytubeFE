"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  type SelectChangeEvent,
  IconButton,
  useTheme,
  Modal,
  Tooltip,
  TextField,
  Paper,
  Menu,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CloseIcon from "@mui/icons-material/Close"
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import {
  Calculate as Matematica,
  Chat as Comunicacion,
  Science as Ciencia,
  Church as Religion,
  FitnessCenter as EduFisica,
  Code as Programacion,
  Psychology,
  Category as DefaultIcon,
} from "@mui/icons-material"
import type { Video } from "../../features/interfaces/video"
import { getVideosByCategory } from "../../features/data/videos-data"
import VideoCard from "../../components/videos/VideoCard"

// Datos iniciales para las categorías de etiquetas
const initialCategoryTabs = [
  { id: "matematicas", label: "Matemática", icon: <Matematica />, color: "#f50057" },
  { id: "comunicacion", label: "Comunicación", icon: <Comunicacion /> },
  { id: "ciencia", label: "Ciencia", icon: <Ciencia /> },
  { id: "religion", label: "Religión", icon: <Religion /> },
  { id: "eduFisica", label: "Edu. Física", icon: <EduFisica /> },
  { id: "programacion", label: "Programación", icon: <Programacion /> },
  { id: "psicologia", label: "Psicología", icon: <Psychology /> },
]

// Opciones para los filtros
const nivelOptions = ["Primaria", "Secundaria", "Universidad", "Profesional"]
const gradoOptions = ["1° Grado", "2° Grado", "3° Grado", "4° Grado", "5° Grado", "6° Grado"]

const EtiquetasPage = () => {
  const theme = useTheme()

  // Estados para los filtros y tabs
  const [currentTab, setCurrentTab] = useState("matematicas")
  const [nivel, setNivel] = useState("")
  const [grado, setGrado] = useState("")

  // Estados para la visualización de video
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  // Estado para las categorías dinámicas
  const [categoryTabs, setCategoryTabs] = useState(initialCategoryTabs)

  // Estado para el modal de agregar etiqueta
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  // Estado para el menú de opciones (tres puntos)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedCategoryName, setEditedCategoryName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Obtener videos de la categoría actual
  const categoryVideos = getVideosByCategory(currentTab)

  // Función para obtener el ícono basado en el nombre de la categoría
  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("matemática")) return <Matematica />
    if (lowerName.includes("comunicación")) return <Comunicacion />
    if (lowerName.includes("ciencia")) return <Ciencia />
    if (lowerName.includes("religión")) return <Religion />
    if (lowerName.includes("física")) return <EduFisica />
    if (lowerName.includes("programación")) return <Programacion />
    if (lowerName.includes("psicología")) return <Psychology />
    return <DefaultIcon /> // Ícono genérico si no coincide con ninguna categoría conocida
  }

  // Manejadores de eventos
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
  }

  const handleNivelChange = (event: SelectChangeEvent) => {
    setNivel(event.target.value)
  }

  const handleGradoChange = (event: SelectChangeEvent) => {
    setGrado(event.target.value)
  }

  const handleOpenVideo = (video: Video) => {
    setSelectedVideo(video)
    setIsMinimized(false)
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const isVideoFile = (filename: string) => {
    return filename.toLowerCase().endsWith(".mp4")
  }

  // Manejadores del modal de agregar etiqueta
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setNewCategoryName("")
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: newCategoryName.toLowerCase().replace(/\s+/g, "_"),
        label: newCategoryName,
        icon: getCategoryIcon(newCategoryName),
      }
      setCategoryTabs((prevTabs) => [...prevTabs, newCategory])
      setNewCategoryName("")
      setIsAddModalOpen(false)
    }
  }

  // Manejadores del menú de opciones (tres puntos)
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, categoryId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedCategory(categoryId) // Aquí se asegura que la categoría seleccionada se guarde correctamente
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
    setSelectedCategory(null)
  }

  const handleEditCategory = () => {
    console.log("Categoría seleccionada para editar:", selectedCategory) // Depuración
    if (!selectedCategory) {
      console.error("No se ha seleccionado ninguna categoría para editar.")
      return
    }

    const category = categoryTabs.find((tab) => tab.id === selectedCategory)
    if (category) {
      setEditedCategoryName(category.label) // Configura el nombre de la categoría en el estado
      setIsEditModalOpen(true) // Abre el modal de edición
    } else {
      console.error("Categoría no encontrada:", selectedCategory)
    }
    handleCloseMenu()
  }

  const handleDeleteCategory = () => {
    setCategoryTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== selectedCategory))
    handleCloseMenu()
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
    setEditedCategoryName("")
  }

  const handleSaveEditedCategory = () => {
    console.log("Guardando categoría:", { selectedCategory, editedCategoryName }) // Depuración
    if (!editedCategoryName.trim()) {
      console.error("El nombre de la etiqueta no puede estar vacío.")
      return
    }

    if (!selectedCategory) {
      console.error("No se ha seleccionado ninguna categoría para guardar.")
      return
    }

    setCategoryTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === selectedCategory
          ? { ...tab, label: editedCategoryName, icon: getCategoryIcon(editedCategoryName) }
          : tab
      )
    )
    setIsEditModalOpen(false)
    setEditedCategoryName("")
    setSelectedCategory(null)
  }

  return (
    <Paper elevation={0} sx={{ p: 2, height: '100vh', bgcolor: 'background.default', borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          }}
        >
          Etiquetas Disponibles:
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="primary"
            aria-label="add tag"
            onClick={handleOpenAddModal}
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 0, 128, 0.1)" : "rgba(255, 0, 128, 0.05)",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 0, 128, 0.2)" : "rgba(255, 0, 128, 0.1)",
              },
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            aria-label="options"
            onClick={(event) => handleOpenMenu(event, currentTab)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Menú de opciones */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditCategory}>Editar</MenuItem>
        <MenuItem onClick={handleDeleteCategory}>Eliminar</MenuItem>
      </Menu>

      {/* Modal para editar etiqueta */}
      <Modal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-category-modal-title"
        aria-describedby="edit-category-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "400px" },
            backgroundColor: theme.palette.background.paper,
            boxShadow: 24,
            p: 3,
            borderRadius: 1,
          }}
        >
          <Typography
            id="edit-category-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Editar Etiqueta
          </Typography>
          <TextField
            fullWidth
            label="Nombre de la Etiqueta"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" onClick={handleEditModalClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSaveEditedCategory}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para agregar etiqueta */}
      <Modal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        aria-labelledby="add-category-modal-title"
        aria-describedby="add-category-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "400px" },
            backgroundColor: theme.palette.background.paper,
            boxShadow: 24,
            p: 3,
            borderRadius: 1,
          }}
        >
          <Typography
            id="add-category-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Agregar Nueva Etiqueta
          </Typography>
          <TextField
            fullWidth
            label="Nombre de la Etiqueta"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" onClick={handleCloseAddModal}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
              Agregar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Tabs de categorías */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="categorías de etiquetas"
          sx={{
            backgroundColor: "transparent",
            "& .MuiTabs-indicator": {
              backgroundColor: "#f50057",
            },
            "& .Mui-selected": {
              color: "#f50057 !important",
            },
          }}
        >
          {categoryTabs.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex" }}>{tab.icon}</Box>
                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {tab.label}
                  </Box>
                </Box>
              }
              sx={{
                textTransform: "none",
                minWidth: "auto",
                padding: { xs: 1, sm: 2 },
                transition: "color 0.3s ease, border-bottom 0.3s ease",
                color: theme.palette.text.secondary,
                ...(currentTab === tab.id && {
                  color: "#f50057",
                  borderBottom: "2px solid #f50057",
                }),
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Filtros */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "flex-end" },
          gap: 2,
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <FormControl
          size="small"
          sx={{
            minWidth: { xs: "100%", sm: "120px" },
            width: { xs: "100%", sm: "150px", md: "200px" },
          }}
        >
          <InputLabel id="nivel-select-label">Nivel</InputLabel>
          <Select
            labelId="nivel-select-label"
            id="nivel-select"
            value={nivel}
            label="Nivel"
            onChange={handleNivelChange}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {nivelOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          size="small"
          sx={{
            minWidth: { xs: "100%", sm: "120px" },
            width: { xs: "100%", sm: "150px", md: "200px" },
          }}
        >
          <InputLabel id="grado-select-label">Grado</InputLabel>
          <Select
            labelId="grado-select-label"
            id="grado-select"
            value={grado}
            label="Grado"
            onChange={handleGradoChange}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {gradoOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Título dinámico según la categoría */}
      {currentTab === "matematicas" && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              borderLeft: "4px solid #f50057",
              pl: 2,
              py: 0.5,
            }}
          >
            "Promover conocimientos de ecuaciones lineales" - MATE - GRADO1
          </Typography>
        </Box>
      )}

      {/* Videos de la categoría seleccionada */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        {categoryVideos.map((video) => (
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
              "&:hover": {
                transform: "translateY(-2px)",
                cursor: "pointer",
              },
            }}
          >
            <VideoCard video={video} isVideo={isVideoFile(video.thumbnail)} onClick={() => handleOpenVideo(video)} />
          </Box>
        ))}

        {/* Mensaje si no hay videos */}
        {categoryVideos.length === 0 && (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              py: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3,
              }}
            >
              No hay videos disponibles para esta categoría aún.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{
                mt: 2,
                borderRadius: "20px",
                textTransform: "none",
                px: 2,
                py: 0.75,
              }}
            >
              Agregar video
            </Button>
          </Box>
        )}
      </Box>

      {/* Modal para vista de video */}
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

              {/* Contenedor del video */}
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
                  >
                    <source src={selectedVideo.thumbnail} type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                  </Box>
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

              {/* Información del video */}
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
                autoPlay
                muted
                loop
                sx={{
                  width: "100%",
                  height: 158,
                  objectFit: "cover",
                }}
                onClick={toggleMinimize}
              >
                <source src={selectedVideo.thumbnail} type="video/mp4" />
                Tu navegador no soporta videos HTML5.
              </Box>
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
    </Paper>

  )
}

export default EtiquetasPage
