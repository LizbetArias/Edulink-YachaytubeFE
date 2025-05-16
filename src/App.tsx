"use client"

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Box, CircularProgress } from "@mui/material"
import { createAppTheme } from "./theme"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import HomePage from "./pages/home"
import EtiquetasPage from "./pages/etiquetas"
import VideosPage from "./pages/videos"
import HistorialPage from "./pages/historial"
import SubscripcionPage from "./pages/subscripcion"
import SettingsPage from "./pages/settings"
import LogoutPage from "./pages/logout"
import LoginPage from "./pages/login/login"
import { SidebarProvider } from "./context/SidebarContext"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import { AuthProvider, useAuth } from "./context/AuthContext"
import ChannelsPage from "./pages/canales"
import MenuConfig from "./pages/configurations/menuconfig"

// Componente de carga
const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// Componente protegido que requiere autenticación
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Ruta pública que redirige si ya estás autenticado
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Componente de configuración
const ConfigPage = () => {
  return (
    <MenuConfig>
      <Box sx={{ p: 3 }}>
        <h1>Configuración de Yachaytube</h1>
        {/* Contenido de la página de configuración */}
      </Box>
    </MenuConfig>
  );
};

// Aplicación principal
const MainApp = () => {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);
  const { isAuthenticated } = useAuth();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthenticated ? (
          <SidebarProvider>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              <Routes>
                <Route path="/config" element={
                  <ProtectedRoute>
                    <ConfigPage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={
                  <>
                    <Sidebar />
                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        transition: (theme) =>
                          theme.transitions.create("margin", {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                          }),
                      }}
                    >
                      <Header />
                      <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/etiquetas" element={<EtiquetasPage />} />
                          <Route path="/videos" element={<VideosPage />} />
                          <Route path="/canales" element={<ChannelsPage />} />
                          <Route path="/historial" element={<HistorialPage />} />
                          <Route path="/subcripcion" element={<SubscripcionPage />} />
                          <Route path="/settings" element={<SettingsPage />} />
                          <Route path="/logout" element={<LogoutPage />} />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      </Box>
                    </Box>
                  </>
                } />
              </Routes>
            </Box>
          </SidebarProvider>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;