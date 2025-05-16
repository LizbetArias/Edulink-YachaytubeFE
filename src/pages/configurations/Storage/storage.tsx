import React from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress, 
  Button,
  ThemeProvider,
  createTheme
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10B981', // Green color for the primary elements
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
});

const Storage = () => {
  // Value for the progress bar (matches the image at around 80%)
  const storageValue = 80;
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ 
        p: 3, 
        bgcolor: 'background.default', 
        minHeight: '100vh'
      }}>
        {/* Header with icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <StorageIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
            Gestiona tu Almacenamiento
          </Typography>
        </Box>
        
        {/* Storage card */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 2, 
            bgcolor: 'background.paper', 
            border: '1px solid', 
            borderColor: 'primary.main',
            borderRadius: 2
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 1 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StorageIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Almacenamiento del sistema
              </Typography>
            </Box>
            
            <Button 
              variant="contained" 
              size="small"
              color="primary"
            >
              Desmontar
            </Button>
          </Box>
          
          {/* Progress bar */}
          <LinearProgress 
            variant="determinate" 
            value={storageValue} 
            sx={{ 
              height: 8, 
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'primary.main',
              }
            }}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Storage;