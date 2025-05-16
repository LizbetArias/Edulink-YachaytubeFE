"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Paper,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Button,
  Stack,
} from "@mui/material"
import { DarkMode, Translate, Speed, Notifications, Lock, AccountCircle, Logout } from "@mui/icons-material"

const SettingsPage = () => {
  const [language, setLanguage] = useState("es")
  const [darkMode, setDarkMode] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value)
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mb: 3,
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
        }}
      >
        Configuración
      </Typography>

      <Paper
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <List sx={{ width: "100%" }}>
          <ListItem>
            <ListItemIcon>
              <DarkMode />
            </ListItemIcon>
            <ListItemText primary="Modo oscuro" secondary="Cambiar entre tema claro y oscuro" />
            <Switch edge="end" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <Translate />
            </ListItemIcon>
            <ListItemText primary="Idioma" secondary="Selecciona el idioma de la aplicación" />
            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select
                value={language}
                onChange={handleLanguageChange}
                displayEmpty
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
              </Select>
            </FormControl>
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <Speed />
            </ListItemIcon>
            <ListItemText primary="Reproducción automática" secondary="Reproducir videos automáticamente" />
            <Switch edge="end" checked={autoplay} onChange={() => setAutoplay(!autoplay)} />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Notificaciones" secondary="Recibir notificaciones de nuevos videos" />
            <Switch edge="end" checked={notifications} onChange={() => setNotifications(!notifications)} />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Privacidad y seguridad" secondary="Administra tus datos y seguridad" />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Cuenta" secondary="Gestiona tu perfil y suscripción" />
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Cerrar sesión
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default SettingsPage
