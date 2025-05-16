// src/pages/videos/my-videos/modal-upload/modal-edit.tsx

import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { Lista } from "../../../../features/interfaces/lista";

interface ModalEditProps {
  open: boolean;
  onClose: () => void;
  video: Lista;
  onSubmit: (videoData: Lista) => void;
  categories: string[];
}

const ModalEdit: React.FC<ModalEditProps> = ({ open, onClose, video, onSubmit, categories }) => {
  const [editVideo, setEditVideo] = React.useState<Lista>(video);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditVideo({ ...editVideo, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditVideo({ ...editVideo, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file); // Leer el archivo como URL
    }
  };

  const handleSubmit = () => {
    onSubmit(editVideo);
    onClose(); // Cerrar el modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20vh' }}>
        <Typography variant="h6" gutterBottom>Editar Video</Typography>
        <TextField label="Título" name="title" value={editVideo.title} onChange={handleInputChange} fullWidth sx={{ marginBottom: 2 }} />
        <Box display="flex" alignItems="center" gap={1} sx={{ marginBottom: 2 }}>
          <TextField label="Thumbnail (URL o archivo)" name="thumbnail" value={editVideo.thumbnail} onChange={handleInputChange} fullWidth />
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload-edit" />
          <label htmlFor="file-upload-edit">
            <Button variant="outlined" component="span">Subir</Button>
          </label>
        </Box>
        <TextField label="Descripción" name="description" value={editVideo.description} onChange={handleInputChange} fullWidth multiline rows={4} sx={{ marginBottom: 2 }} />
        <TextField name="category" value={editVideo.category} onChange={handleInputChange} select fullWidth sx={{ marginBottom: 2 }} SelectProps={{ native: true }}>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Guardar Cambios</Button>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
