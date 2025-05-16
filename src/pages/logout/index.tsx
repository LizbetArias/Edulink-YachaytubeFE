"use client"

import { useEffect, useState } from "react" 
import { Box, Typography, Paper, Button, CircularProgress, Stack } from "@mui/material" 
import { ExitToApp, Home } from "@mui/icons-material" 
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../context/AuthContext';

const LogoutPage = () => {
  const navigate = useNavigate()
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true)
  
  // Proceso de cierre de sesión
  useEffect(() => {
    const timer = setTimeout(() => {
      logout(); // Llamar a la función logout del AuthContext
      setLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [logout])
  
  const handleGoHome = () => {
    navigate("/login") // Redirigir al login en lugar de home después de cerrar sesión
  }
  
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 2,
        }}
      >
        {loading ? (
          <>
            <CircularProgress color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Cerrando sesión...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Por favor espera mientras cerramos tu sesión de forma segura.
            </Typography>
          </>
        ) : (
          <>
            <ExitToApp sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              ¡Hasta pronto!
            </Typography>
            <Typography variant="body1" paragraph>
              Has cerrado sesión correctamente.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Gracias por usar YachayTube. ¡Esperamos verte pronto de nuevo!
            </Typography>
            
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Home />}
                onClick={handleGoHome}
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Volver al inicio
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  )
}

export default LogoutPage;