import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon,
  Settings as SettingsIcon,
  Block as BlockIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface Channel {
  id: number;
  name: string;
  owner: string;
  avatar: string;
  banner: string;
  subscribers: number;
  isSubscribed: boolean;
  notificationLevel: 'all' | 'none' | 'custom';
}

interface SuscritosProps {
  channels: Channel[];
  onUnsubscribe: (id: number) => void;
  onChangeNotifications: (id: number, level: 'all' | 'none' | 'custom') => void;
}

const Suscritos: React.FC<SuscritosProps> = ({ channels, onUnsubscribe, onChangeNotifications }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedChannel, setSelectedChannel] = React.useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, channelId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedChannel(channelId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChannel(null);
  };

  const subscribedChannels = channels.filter(channel => channel.isSubscribed);

  return (
    <Grid container spacing={3}>
      {subscribedChannels.map((channel) => (
        <Grid item xs={12} sm={6} md={4} key={channel.id}>
          <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)'
            }
          }}>
            <CardMedia
              component="img"
              height="140"
              image={channel.banner}
              alt={channel.name}
            />
            <Box sx={{ position: 'relative', mt: -5, textAlign: 'center' }}>
              <Avatar
                src={channel.avatar}
                sx={{
                  width: 80,
                  height: 80,
                  border: '4px solid',
                  borderColor: 'background.paper',
                  margin: '0 auto'
                }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {channel.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {channel.subscribers.toLocaleString()} suscriptores
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<NotificationsActiveIcon />}
                  onClick={(e) => handleMenuOpen(e, channel.id)}
                >
                  Notificaciones
                </Button>
                <IconButton
                  onClick={() => onUnsubscribe(channel.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          if (selectedChannel) onChangeNotifications(selectedChannel, 'all');
          handleMenuClose();
        }}>
          <ListItemIcon>
            <NotificationsActiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Todas las notificaciones</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedChannel) onChangeNotifications(selectedChannel, 'custom');
          handleMenuClose();
        }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Personalizadas</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedChannel) onChangeNotifications(selectedChannel, 'none');
          handleMenuClose();
        }}>
          <ListItemIcon>
            <NotificationsOffIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ninguna</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedChannel) onUnsubscribe(selectedChannel);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cancelar suscripción</ListItemText>
        </MenuItem>
      </Menu>

      {subscribedChannels.length === 0 && (
        <Box sx={{ 
          width: '100%', 
          textAlign: 'center', 
          py: 8 
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No estás suscrito a ningún canal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Suscríbete a canales para verlos aquí
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default Suscritos;