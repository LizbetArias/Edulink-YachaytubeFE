import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  NotificationsActive as NotificationsActiveIcon
} from '@mui/icons-material';

import { Channel } from './interfaces';

interface FavoritosProps {
  channels: Channel[];
  onToggleFavorite: (id: number) => void;
  onToggleSubscription: (id: number) => void;
}

const Favoritos: React.FC<FavoritosProps> = ({ channels, onToggleFavorite, onToggleSubscription }) => {
  const favoriteChannels = channels.filter(channel => channel.isFavorite);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3
      }}
    >
      {favoriteChannels.map((channel) => (
        <Box
          key={channel.id}
          sx={{
            width: {
              xs: '100%',
              sm: 'calc(50% - 12px)',
              md: 'calc(33.33% - 12px)'
            },
            boxSizing: 'border-box'
          }}
        >
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
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

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                <IconButton
                  color="error"
                  onClick={() => onToggleFavorite(channel.id)}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  color={channel.isSubscribed ? "primary" : "default"}
                  onClick={() => onToggleSubscription(channel.id)}
                >
                  <NotificationsActiveIcon />
                </IconButton>
              </Box>

              <Button
                variant={channel.isSubscribed ? "outlined" : "contained"}
                color="primary"
                onClick={() => onToggleSubscription(channel.id)}
                fullWidth
              >
                {channel.isSubscribed ? 'Suscrito' : 'Suscribirse'}
              </Button>
            </CardContent>
          </Card>
        </Box>
      ))}

      {favoriteChannels.length === 0 && (
        <Box sx={{
          width: '100%',
          textAlign: 'center',
          py: 8
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tienes canales favoritos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Marca canales como favoritos para verlos aquí
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Favoritos;
