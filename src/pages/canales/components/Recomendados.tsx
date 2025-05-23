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
  Chip
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';

// Aca importo las interfaces - model
import { Channel } from './interfaces'; // ruta correspondiente

interface RecomendadosProps {
  channels: Channel[];
  onToggleFavorite: (id: number) => void;
  onSubscribe: (id: number) => void;
}

const Recomendados: React.FC<RecomendadosProps> = ({ channels, onToggleFavorite, onSubscribe }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {channels.map((channel) => (
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
                <Chip label={channel.category} color="primary" size="small" />
                <IconButton
                  onClick={() => onToggleFavorite(channel.id)}
                  color="error"
                  size="small"
                >
                  {channel.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              <Button
                variant={channel.isSubscribed ? "outlined" : "contained"}
                color="primary"
                onClick={() => onSubscribe(channel.id)}
                fullWidth
              >
                {channel.isSubscribed ? 'Suscrito' : 'Suscribirse'}
              </Button>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default Recomendados;
