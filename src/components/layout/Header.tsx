"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Toolbar,
  styled,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import MenuIcon from "@mui/icons-material/Menu"
import GoogleIcon from "@mui/icons-material/Google"
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingsIcon from "@mui/icons-material/Settings"

import { useSidebar } from "../../context/SidebarContext"
import { useTheme as useAppTheme } from "../../context/ThemeContext"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "100%",
  maxWidth: 500,
  display: "flex",
  alignItems: "center",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}))

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { toggleSidebar } = useSidebar()
  const { mode, toggleTheme } = useAppTheme()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSettings = () => {
    navigate("/config") // Redirigimos a la página de MenuConfig
    handleClose()
  }

  const handleLogout = () => {
    console.log("Cerrar sesión")
    handleClose()
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: (theme) => theme.palette.background.default,
        boxShadow: "none",
        borderBottom: (theme) =>
          `1px solid ${mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <IconButton color="inherit" onClick={toggleSidebar} edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Barra de búsqueda"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} alt="User Profile" src="https://via.placeholder.com/150" />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              width: 220,
              bgcolor: mode === "dark" ? "#1e1e1e" : "#fff",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 40, height: 40 }} alt="User Profile" src="https://via.placeholder.com/150" />
            <Box>
              <Typography variant="subtitle2">Hola, Edulink. Junito</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "bold" }}>
                Rol: SUPER ADMIN
              </Typography>
            </Box>
          </Box>

          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <GoogleIcon fontSize="small" />
            </ListItemIcon>
            Cuenta de Google
          </MenuItem>

          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Configuraciones
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SwitchAccountIcon fontSize="small" />
            </ListItemIcon>
            Cambiar Cuenta
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </Box>
  )
}

export default Header