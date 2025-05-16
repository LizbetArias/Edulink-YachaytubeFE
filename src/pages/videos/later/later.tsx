// VerMasTarde.tsx
import React from "react";
import { Lista as IVideo } from "../../../features/interfaces/lista";
import {
  Box,
  Paper,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
} from "@mui/material";
import {
  MoreVert,
  Share,
  GetApp,
  Delete,
  PlayCircleOutline,
} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { format } from "date-fns";

interface VerMasTardeProps {
  videos: IVideo[];
  onDelete: (videoId: number) => void;
}

const VerMasTarde: React.FC<VerMasTardeProps> = ({ videos, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuVideoId, setMenuVideoId] = React.useState<number | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    videoId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuVideoId(videoId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuVideoId(null);
  };

  const handleDeleteVideo = (videoId: number) => {
    onDelete(videoId);
    handleMenuClose();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} marginTop={3}>
      {videos.map((video) => (
        <Paper key={video.id} elevation={3} sx={{ boxShadow: 'none' }}>
          <Box display="flex" alignItems="center">
            <Box position="relative">
              <CardMedia
                component="img"
                image={video.thumbnail}
                alt={video.title}
                sx={{ width: 160, height: 120, borderRadius: 1 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "2px 4px",
                  borderRadius: 1,
                  fontSize: "12px",
                }}
              >
                {video.duration}
              </Box>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                }}
              >
                <PlayCircleOutline
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    fontSize: "40px",
                    borderRadius: 10,
                  }}
                />
              </IconButton>
            </Box>
            <CardContent sx={{ flex: 1, padding: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {video.author}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Chip
                  label={format(video.viewedAt, "dd/MM/yyyy HH:mm")}
                  size="small"
                />
              </Box>
            </CardContent>
            <IconButton
              onClick={(e) => handleMenuOpen(e, video.id)}
              sx={{ marginRight: 1 }}
            >
              <MoreVert />
            </IconButton>
          </Box>
          <Divider />
          <Menu
            anchorEl={anchorEl}
            open={menuVideoId === video.id}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                minWidth: 180,
                borderRadius: 2,
                mt: 1,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Share fontSize="small" />
              </ListItemIcon>
              <ListItemText>Compartir</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <GetApp fontSize="small" />
              </ListItemIcon>
              <ListItemText>Descargar</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Favoritos</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleDeleteVideo(video.id)}>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Quitar video</ListItemText>
            </MenuItem>
          </Menu>
        </Paper>
      ))}
    </Box>
  );
};

export default VerMasTarde;
