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
  Chip
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';

interface Channel {
  id: number;
  name: string;
  owner: string;
  avatar: string;
  banner: string;
  subscribers: number;
  category: string;
  isFavorite: boolean;
  isSubscribed: boolean;
}

interface RecomendadosProps {
  channels: Channel[];
  onToggleFavorite: (id: number) => void;
  onSubscribe: (id: number) => void;
}

const Recomendados: React.FC<RecomendadosProps> = ({ channels, onToggleFavorite, onSubscribe }) => {
  return (
    <Grid container spacing={3}>
      {channels.map((channel) => (
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
        </Grid>
      ))}
    </Grid>
  );
};

export default Recomendados;