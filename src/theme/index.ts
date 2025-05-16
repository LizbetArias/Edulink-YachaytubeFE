import { createTheme } from "@mui/material/styles"

// Función para crear el tema basado en el modo
const createAppTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#f50057", // Color rosa para la barra de progreso profesional
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#121212",
        secondary: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "dark" ? "#121212" : "#ffffff",
            borderRight: mode === "dark" ? "none" : "1px solid #e0e0e0",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: "4px 8px",
            "&:hover": {
              backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
            borderRadius: 12,
          },
        },
      },
    },
  })
}

// Exportamos el tema oscuro por defecto
const theme = createAppTheme("dark")

export default theme

// Exportamos la función para crear temas
export { createAppTheme }
