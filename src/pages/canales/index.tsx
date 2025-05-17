import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  VideoLibrary as VideoLibraryIcon,
  Favorite as FavoriteIcon,
  Subscriptions as SubscriptionsIcon,
  Recommend as RecommendIcon,
  Add as AddIcon
} from '@mui/icons-material';
// Interfaces
import { Channel } from '../../pages/canales/components/interfaces';

import Canal from './components/Canal';
import Favoritos from './components/Favoritos';
import Suscritos from './components/Suscritos';
import Recomendados from './components/Recomendados';

// Interfaces


const ChannelsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 1,
      name: "Canal Principal",
      owner: "Juan Pérez",
      isPublic: true,
      isActive: true,
      avatar: "/avatars/avatar1.jpg",
      banner: "https://www.shutterstock.com/image-vector/modern-black-blue-abstract-background-600nw-2519806569.jpg",
      subscribers: 1200,
      videos: 45,
      description: "Canal educativo principal",
      category: "Educación",
      isFavorite: true,
      isSubscribed: true,
      notificationLevel: 'all'
    },
    // Add more channels as needed
  ]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleEditChannel = (updatedChannel: Channel) => {
    setChannels(prev => 
      prev.map(channel => 
        channel.id === updatedChannel.id ? updatedChannel : channel
      )
    );
  };

  const handleDeleteChannel = (channelId: number) => {
    setChannels(prev => prev.filter(channel => channel.id !== channelId));
  };

  const handleToggleActive = (channelId: number) => {
    setChannels(prev =>
      prev.map(channel =>
        channel.id === channelId
          ? { ...channel, isActive: !channel.isActive }
          : channel
      )
    );
  };

  const handleToggleFavorite = (channelId: number) => {
    setChannels(prev =>
      prev.map(channel =>
        channel.id === channelId
          ? { ...channel, isFavorite: !channel.isFavorite }
          : channel
      )
    );
  };

  const handleToggleSubscription = (channelId: number) => {
    setChannels(prev =>
      prev.map(channel =>
        channel.id === channelId
          ? { ...channel, isSubscribed: !channel.isSubscribed }
          : channel
      )
    );
  };

  const handleChangeNotifications = (channelId: number, level: 'all' | 'none' | 'custom') => {
    setChannels(prev =>
      prev.map(channel =>
        channel.id === channelId
          ? { ...channel, notificationLevel: level }
          : channel
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Gestión de Canales
        </Typography>
      </Box>

      <Tabs 
        value={selectedTab} 
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
      >
        <Tab 
          icon={<VideoLibraryIcon />} 
          label="Mi Perfil" 
          iconPosition="start"
        />
        <Tab 
          icon={<FavoriteIcon />} 
          label="Favoritos" 
          iconPosition="start"
        />
        <Tab 
          icon={<SubscriptionsIcon />} 
          label="Suscritos" 
          iconPosition="start"
        />
        <Tab 
          icon={<RecommendIcon />} 
          label="Recomendados" 
          iconPosition="start"
        />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && channels.map(channel => (
          <Canal
            key={channel.id}
            channel={channel}
            onEdit={handleEditChannel}
            onDelete={handleDeleteChannel}
            onToggleActive={handleToggleActive}
          />
        ))}
        
        {selectedTab === 1 && (
          <Favoritos
            channels={channels}
            onToggleFavorite={handleToggleFavorite}
            onToggleSubscription={handleToggleSubscription}
          />
        )}
        
        {selectedTab === 2 && (
          <Suscritos
            channels={channels}
            onUnsubscribe={handleToggleSubscription}
            onChangeNotifications={handleChangeNotifications}
          />
        )}
        
        {selectedTab === 3 && (
          <Recomendados
            channels={channels}
            onToggleFavorite={handleToggleFavorite}
            onSubscribe={handleToggleSubscription}
          />
        )}
      </Box>
    </Box>
  );
};

export default ChannelsPage;