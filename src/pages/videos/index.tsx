// VideosPage.tsx
"use client";

import React, { useState } from "react";
import { Lista as IVideo } from "../../features/interfaces/lista";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import { transformarVideosAListas } from "../../features/data/lista-videos"; 
import Favoritos from './favorite/favorite';
import VerMasTarde from './later/later';
import MisVideos from './my-videos/videos';
import MyList from './favorite/my-list/MyList';

// Datos tipados
const videoLists: {
  favoritos: IVideo[];
  verMasTarde: IVideo[];
  misVideos: IVideo[];
} = {
  favoritos: transformarVideosAListas().filter(video => video.Favorites_list === "true"),
  verMasTarde: transformarVideosAListas().filter(video => video.Later_list === "true"),
  misVideos: transformarVideosAListas().filter(video => video.MyVideos_list === "true"),
};

// Definir las categorías (puedes modificar esto según tus necesidades)
const categories = ["Educación", "Entretenimiento", "Tecnología", "Ciencia"]; // Ejemplo de categorías

// Componente principal
const VideosPage: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDeleteVideo = (videoId: number) => {
    console.log("Eliminar video con ID:", videoId);
    // Aquí puedes implementar la lógica para eliminar el video
  };

  return (
    <Paper elevation={0} sx={{ p: 2, height:'100vh', bgcolor: 'background.default', borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Biblioteca de Videos
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Favoritos" />
        <Tab label="Ver más tarde" />
        <Tab label="Mis Videos" />
      </Tabs>

      <Box>
        {tabValue === 0 && <Favoritos initialVideos={videoLists.favoritos} onDelete={handleDeleteVideo} />}
        {tabValue === 1 && <VerMasTarde videos={videoLists.verMasTarde} onDelete={handleDeleteVideo} />}
        {tabValue === 2 && <MisVideos videos={videoLists.misVideos} onDelete={handleDeleteVideo} categories={categories} />}
        {tabValue === 3 && <MyList videos={videoLists.favoritos} />} {/* Renderiza MyList aquí */}
      </Box>
    </Paper>
  );
};

export default VideosPage;
