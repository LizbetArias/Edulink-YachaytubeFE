import { useState, MouseEvent } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button, Avatar, Stack, Divider, Chip, Menu, MenuItem, ListItemIcon} from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import CancelIcon from '@mui/icons-material/Cancel';

// Datos de ejemplo
const subscriptions = [
  {
    id: 1,
    name: "Juanito Edulink",
    avatar: "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg",
    banner: "https://www.shutterstock.com/image-vector/modern-black-blue-abstract-background-600nw-2519806569.jpg",
    subscribers: "1.2M",
    videos: 120,
    isNotificationsOn: false,
  },
  {
    id: 2,
    name: "Programación Fácil",
    avatar: "https://st2.depositphotos.com/2703645/5669/v/450/depositphotos_56695433-stock-illustration-female-avatar.jpg",
    banner: "https://www.shutterstock.com/image-vector/abstract-background-design-diagonal-blue-260nw-2475424885.jpg",
    subscribers: "850K",
    videos: 85,
    isNotificationsOn: false,
  },
  {
    id: 3,
    name: "Ciencia Divertida",
    avatar: "https://www.shutterstock.com/image-vector/boy-happy-mode-emoji-style-600nw-2482094363.jpg",
    banner: "https://img.freepik.com/vector-gratis/diseno-banner-fondo-profesional-negocios-abstracto-multiproposito_1340-16858.jpg",
    subscribers: "2.5M",
    videos: 210,
    isNotificationsOn: false,
  },
  {
    id: 4,
    name: "Matemáticas Pro",
    avatar: "https://st4.depositphotos.com/5934840/27053/v/450/depositphotos_270534534-stock-illustration-businessman-avatar-cartoon-character.jpg",
    banner: "https://t3.ftcdn.net/jpg/05/69/02/82/360_F_569028224_654wKKS0ixP6DSBSFObbPRFU2UbcPyja.jpg",
    subscribers: "450K",
    videos: 65,
    isNotificationsOn: false,
  },
  {
    id: 5,
    name: "Comunicaciones",
    avatar: "https://www.svgrepo.com/show/382095/female-avatar-girl-face-woman-user-4.svg",
    banner: "https://static.vecteezy.com/system/resources/previews/012/979/486/non_2x/modern-material-banner-with-overlapped-sheets-of-paper-in-cmyk-colors-template-for-your-business-abstract-widescreen-background-vector.jpg",
    subscribers: "450K",
    videos: 55,
    isNotificationsOn: false,
  },
  {
    id: 6,
    name: "Personal Social",
    avatar: "https://thumbs.dreamstime.com/b/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276189214.jpg",
    banner: "https://i.pinimg.com/736x/1e/d2/ac/1ed2ac411a36cfb14c3d95b110379f7c.jpg",
    subscribers: "450K",
    videos: 34,
    isNotificationsOn: false,
  },
]

const SubscripcionPage = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option: string) => {
    console.log(`Opción seleccionada: ${option}`);
    handleClose();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3} }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mb: 3,
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
        }}
      >
        Mis Suscripciones
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {subscriptions.map((channel) => (
          <Box
            key={channel.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.333% - 16px)",
                cursor: "pointer"
              },
            }}
          >
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={channel.banner}
                alt={`${channel.name} banner`}
                sx={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: -4,
                }}
              >
                <Avatar
                  src={channel.avatar}
                  alt={channel.name}
                  sx={{
                    width: 80,
                    height: 80,
                    border: "4px solid #121212",
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: "center", pt: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {channel.name}
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                  <Chip
                    label={`${channel.subscribers} suscriptores`}
                    size="small"
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                  <Chip
                    label={`${channel.videos} videos`}
                    size="small"
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </Stack>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleClick}
                  sx={{
                    borderRadius: 6,
                    textTransform: "none",
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2, // Agrega un margen inferior para separar el botón del menú
                  }}
                >
                  Notificaciones
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      minWidth: 180,
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      color: 'black',
                      marginLeft:"10%",
                      marginTop:"10px",
                      boxShadow: '0 2px 8px rgba(63, 63, 63, 0.12)',
                    },
                  }}
                >
                  <MenuItem onClick={() => handleOptionSelect("Todas")}>
                    <ListItemIcon><NotificationsIcon fontSize="small" /></ListItemIcon>
                    Todas
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionSelect("Personalizadas")}>
                    <ListItemIcon><NotificationsActiveIcon fontSize="small" /></ListItemIcon>
                    Personalizadas
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionSelect("Ninguna")}>
                    <ListItemIcon><NotificationsOffIcon fontSize="small" /></ListItemIcon>
                    Ninguna
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleOptionSelect("Anular Suscripción")}>
                    <ListItemIcon><CancelIcon fontSize="small" /></ListItemIcon>
                    Anular Suscripción
                  </MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default SubscripcionPage
