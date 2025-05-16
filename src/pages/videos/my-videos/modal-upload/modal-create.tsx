// src/pages/videos/my-videos/modal-upload/modal-create.tsx

import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { Lista } from "../../../../features/interfaces/lista";

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (videoData: Lista) => void;
  categories: string[];
}

const ModalCreate: React.FC<ModalCreateProps> = ({ open, onClose, onSubmit, categories }) => {
  const [newVideo, setNewVideo] = React.useState<{
    title: string;
    thumbnail: string;
    description: string;
    category: string;
  }>({
    title: "",
    thumbnail: "",
    description: "",
    category: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewVideo({ ...newVideo, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file); // Leer el archivo como URL
    }
  };

  const handleSubmit = () => {
    const videoId = Math.random(); // Generar un ID único
    const newVideoData: Lista = {
      id: videoId,
      title: newVideo.title,
      thumbnail: newVideo.thumbnail,
      author: "Autor por defecto",
      avatar: "",
      role: "Rol por defecto",
      description: newVideo.description,
      viewedAt: new Date(),
      duration: "00:00",
      category: newVideo.category,
      Favorites_list: "false",
      Later_list: "true",
      MyVideos_list: "true",
      group_list: "",
    };
    onSubmit(newVideoData);
    onClose(); // Cerrar el modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20vh' }}>
        <Typography variant="h6" gutterBottom>Subir Nuevo Video</Typography>
        <TextField label="Título" name="title" value={newVideo.title} onChange={handleInputChange} fullWidth sx={{ marginBottom: 2 }} />
        <Box display="flex" alignItems="center" gap={1} sx={{ marginBottom: 2 }}>
          <TextField label="Thumbnail (URL o archivo)" name="thumbnail" value={newVideo.thumbnail} onChange={handleInputChange} fullWidth />
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload-create" />
          <label htmlFor="file-upload-create">
            <Button variant="outlined" component="span">Subir</Button>
          </label>
        </Box>
        <TextField label="Descripción" name="description" value={newVideo.description} onChange={handleInputChange} fullWidth multiline rows={4} sx={{ marginBottom: 2 }} />
        <TextField name="category" value={newVideo.category} onChange={handleInputChange} select fullWidth sx={{ marginBottom: 2 }} SelectProps={{ native: true }}>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Crear Video</Button>
      </Box>
    </Modal>
  );
};

export default ModalCreate;
