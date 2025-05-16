// src/components/layout/Sidebar.tsx

"use client"

import { Link } from "react-router-dom"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import LabelIcon from "@mui/icons-material/Label"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import HistoryIcon from "@mui/icons-material/History"
import PeopleIcon from "@mui/icons-material/People"
import SettingsIcon from "@mui/icons-material/Settings"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import CloseIcon from "@mui/icons-material/Close"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useSidebar } from "../../context/SidebarContext"

const drawerWidth = 240

const Sidebar = () => {
  const theme = useMuiTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar()

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/" },
    { text: "Etiquetas", icon: <LabelIcon />, path: "/etiquetas", badge: "10" },
    { text: "Lista de videos", icon: <VideoLibraryIcon />, path: "/videos" },
    { text: "Canales", icon: <PeopleIcon />, path: "/canales" },
    { text: "Historial", icon: <HistoryIcon />, path: "/historial" },
    { text: "Subcripción", icon: <PeopleIcon />, path: "/subcripcion" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Log out", icon: <ExitToAppIcon />, path: "/logout" },
  ]

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={sidebarOpen}
      onClose={closeSidebar}
      sx={{
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <YouTubeIcon sx={{ color: "#4caf50" }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            YachayTube
          </Typography>
        </Box>
        <IconButton onClick={toggleSidebar} sx={{ display: { xs: "flex", md: "none" } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path} onClick={isMobile ? closeSidebar : undefined}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.badge && (
                <Typography variant="caption" color="text.secondary">
                  {item.badge}
                </Typography>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
              Professional
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Storage
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={70} color="primary" sx={{ height: 4, borderRadius: 2 }} />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Expires: 4 jun 2025
        </Typography>
      </Box>
    </Drawer>
  )
}

export default Sidebar
