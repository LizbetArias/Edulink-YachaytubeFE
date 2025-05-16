import React, { useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Typography, 
  Divider, 
  IconButton,
  Tooltip,
  Chip,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Container,
  Collapse,
  SwipeableDrawer
} from '@mui/material';
import { useTheme as useAppTheme } from '../../context/ThemeContext';

// Iconos
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VideoCallIcon from '@mui/icons-material/VideoCall'; // Nuevo icono para Crea Canales

// Importamos los componentes de cada sección
import Collaborators from './collaborators/collaborators';
import Educational from './Educational/educational';
import Permissions from './Permissions/permissions';
import Storage from './Storage/storage';
import Teams from './Teams/teams';
import Terms from './Terms/terms';
// Importamos el componente CreateCanal
import CreateCanal from './creatcanal/createcanal';

// Definición de la interfaz para los elementos del menú
interface MenuItem {
  text: string;
  icon: React.ReactElement;
  component: React.ReactElement;
  action?: () => void;  // Propiedad opcional para acciones personalizadas
}

// Definición de la interfaz para las categorías
interface MenuCategory {
  category: string;
  items: MenuItem[];
}

// Definición de la interfaz para el componente
interface MenuConfigProps {
  children?: ReactNode;
}

// Ancho del menú lateral (ajustado para diferentes tamaños)
const getDrawerWidth = (screenSize: string) => {
  switch (screenSize) {
    case 'xs': return 240;
    case 'sm': return 260;
    default: return 280;
  }
};

const MenuConfig: React.FC<MenuConfigProps> = ({ children }) => {
  const { mode, toggleTheme } = useAppTheme();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string>('Colaboradores');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState<Record<string, boolean>>({
    'Gestión': true,
    'Configuración': true
  });
  
  // Usar MUI theme para detectar breakpoints
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  
  const isMobile = isMd;
  const isSmallScreen = isSm;
  const isVerySmallScreen = isXs;
  
  // Determinar ancho del drawer basado en tamaño de pantalla
  const drawerWidth = isVerySmallScreen ? getDrawerWidth('xs') : 
                      isSmallScreen ? getDrawerWidth('sm') : 
                      getDrawerWidth('default');

  // Elementos del menú organizados por categorías
  const menuCategories: MenuCategory[] = [
    {
      category: 'Gestión',
      items: [
        { text: 'Colaboradores', icon: <PeopleOutlineIcon />, component: <Collaborators /> },
        { text: 'TEAMS', icon: <GroupsIcon />, component: <Teams /> },
        { text: 'Sedes Educativas', icon: <SchoolIcon />, component: <Educational /> },
        // Elemento para Crea Canales con componente
        { 
          text: 'Crea Canales', 
          icon: <VideoCallIcon />, 
          component: <CreateCanal />,
          // La propiedad action ya no existe, ya que ahora tenemos un componente
        },
      ]
    },
    {
      category: 'Configuración',
      items: [
        { text: 'Almacenamiento', icon: <StorageIcon />, component: <Storage /> },
        { text: 'Permisos', icon: <SecurityIcon />, component: <Permissions /> },
        { text: 'Términos y condiciones', icon: <DescriptionIcon />, component: <Terms /> }
      ]
    }
  ];

  // Aplanar los elementos del menú para facilitar búsquedas
  const menuItems = menuCategories.flatMap(category => category.items);

  // Función para volver a la página principal
  const handleGoBack = () => {
    navigate('/');
  };

  // Función para manejar la selección del menú
  const handleMenuSelect = (text: string) => {
    // Buscar el elemento de menú seleccionado
    const selectedItem = menuItems.find(item => item.text === text);
    
    // Si tiene acción personalizada, ejecutarla en lugar de cambiar la sección
    if (selectedItem && selectedItem.action) {
      selectedItem.action();
      return;
    }
    
    // Comportamiento normal para otros elementos
    setSelectedSection(text);
    if (isMobile) {
      setMobileOpen(false); // Cerrar drawer en mobile
    }
  };

  // Función para alternar categorías
  const toggleCategory = (category: string) => {
    setShowCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Manejo del toggle del drawer en mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Función para renderizar el contenido según la sección seleccionada
  const renderContent = () => {
    const selectedItem = menuItems.find(item => item.text === selectedSection);
    return selectedItem && selectedItem.component ? selectedItem.component : children;
  };

  // Ajustar la visualización basada en orientación del dispositivo
  useEffect(() => {
    const handleResize = () => {
      // Lógica adicional si es necesaria para manejar cambios de orientación
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Estilos adaptados para diferentes tamaños de pantalla
  const getResponsiveStyles = () => {
    return {
      avatarBox: {
        width: isVerySmallScreen ? 40 : isSmallScreen ? 50 : 60,
        height: isVerySmallScreen ? 40 : isSmallScreen ? 50 : 60,
        mr: isSmallScreen ? 0 : 2,
        mb: isSmallScreen ? 1 : 0
      },
      padding: {
        xs: isVerySmallScreen ? 1 : 2,
        sm: 2,
        md: 3
      },
      fontSize: {
        title: isVerySmallScreen ? '0.85rem' : isSmallScreen ? '0.9rem' : '1rem',
        subtitle: isVerySmallScreen ? '0.75rem' : isSmallScreen ? '0.8rem' : '0.875rem',
        menuItem: isVerySmallScreen ? '0.85rem' : isSmallScreen ? '0.9rem' : '0.95rem'
      }
    };
  };

  const styles = getResponsiveStyles();

  // Contenido del drawer (compartido entre versión mobile y desktop)
  const drawerContent = (
    <>
      <Box sx={{ 
        padding: styles.padding,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: '#121212',
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: isVerySmallScreen ? 1 : 2,
          flexDirection: isSmallScreen ? 'column' : 'row'
        }}>
          <Avatar 
            sx={{ 
              width: styles.avatarBox.width, 
              height: styles.avatarBox.height, 
              bgcolor: '#FFD700',
              mr: styles.avatarBox.mr,
              mb: styles.avatarBox.mb
            }}
            src="/path-to-avatar-image.jpg"
            alt="Juanito EDULINK"
          />
          <Box sx={{ 
            textAlign: isSmallScreen ? 'center' : 'left'
          }}>
            <Typography 
              variant={isSmallScreen ? "subtitle1" : "h6"} 
              sx={{ 
                fontWeight: 'bold', 
                color: 'white', 
                fontSize: styles.fontSize.title 
              }}
            >
              Juanito EDULINK
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)', 
                mb: 1,
                fontSize: styles.fontSize.subtitle
              }}
            >
              Configuración de Yachaytube
            </Typography>
            <Chip
              label="ADMIN"
              size="small"
              sx={{ 
                bgcolor: '#4CAF50',
                color: 'white',
                fontWeight: 'bold',
                fontSize: isVerySmallScreen ? '0.65rem' : '0.7rem',
                height: isVerySmallScreen ? '20px' : '24px'
              }}
            />
          </Box>
        </Box>
        
        {/* Tema claro/oscuro */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, width: '100%' }}>
          <Tooltip title={`Cambiar a modo ${mode === 'dark' ? 'claro' : 'oscuro'}`}>
            <IconButton 
              onClick={toggleTheme} 
              size={isSmallScreen ? "small" : "medium"}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              {mode === 'dark' ? 
                <Brightness7Icon fontSize={isVerySmallScreen ? "small" : "medium"} /> : 
                <Brightness4Icon fontSize={isVerySmallScreen ? "small" : "medium"} />
              }
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      
      {/* Lista de menú con categorías colapsables */}
      <List sx={{ py: isVerySmallScreen ? 1 : 2, flex: 1 }}>
        {menuCategories.map((category) => (
          <React.Fragment key={category.category}>
            {/* Encabezado de categoría colapsable */}
            <ListItemButton 
              onClick={() => toggleCategory(category.category)}
              sx={{ 
                py: isVerySmallScreen ? 1 : 1.5,
                px: isVerySmallScreen ? 2 : 3,
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <ListItemText 
                primary={category.category} 
                primaryTypographyProps={{ 
                  fontSize: styles.fontSize.menuItem,
                  fontWeight: 'medium',
                  color: 'white'
                }}
              />
              {showCategories[category.category] ? 
                <KeyboardArrowUpIcon fontSize="small" sx={{ color: 'white' }} /> : 
                <KeyboardArrowDownIcon fontSize="small" sx={{ color: 'white' }} />
              }
            </ListItemButton>
            
            {/* Elementos de la categoría */}
            <Collapse in={showCategories[category.category]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.items.map((item) => (
                  <ListItemButton 
                    key={item.text} 
                    selected={selectedSection === item.text && !item.action}
                    onClick={() => handleMenuSelect(item.text)}
                    sx={{ 
                      py: isVerySmallScreen ? 1 : 1.5,
                      pl: isVerySmallScreen ? 3 : 4,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                        }
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: isVerySmallScreen ? '28px' : isSmallScreen ? '30px' : '40px', 
                      color: 'white'
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ 
                        fontSize: styles.fontSize.menuItem,
                        fontWeight: selectedSection === item.text ? 'medium' : 'normal',
                        color: 'white'
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ mt: 'auto', p: isVerySmallScreen ? 1 : 2 }}>
        <ListItemButton 
          sx={{ 
            py: isVerySmallScreen ? 1 : 1.5,
            pl: isVerySmallScreen ? 2 : 3,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.05)',
            }
          }} 
          onClick={handleGoBack}
        >
          <ListItemIcon sx={{ 
            color: 'white', 
            minWidth: isVerySmallScreen ? '28px' : isSmallScreen ? '30px' : '40px' 
          }}>
            <LogoutIcon fontSize={isVerySmallScreen ? "small" : "medium"} />
          </ListItemIcon>
          <ListItemText 
            primary="Salir de Config" 
            primaryTypographyProps={{ 
              fontSize: styles.fontSize.menuItem,
              color: 'white'
            }}
          />
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100%',
      overflow: 'hidden' 
    }}>
      {/* AppBar solo visible en móviles */}
      {isMobile && (
        <AppBar 
          position="fixed" 
          sx={{ 
            width: '100%',
            backgroundColor: '#121212',
            boxShadow: 1,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ 
            minHeight: isVerySmallScreen ? 56 : 64, 
            px: isVerySmallScreen ? 1 : 2 
          }}>
            <IconButton
              color="inherit"
              aria-label="abrir menú"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: isVerySmallScreen ? 1 : 2 }}
              size={isVerySmallScreen ? "small" : "medium"}
            >
              <MenuIcon fontSize={isVerySmallScreen ? "small" : "medium"} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SettingsIcon sx={{ 
                mr: 1, 
                fontSize: isVerySmallScreen ? 20 : 24, 
                color: '#90CAF9' 
              }} />
              <Typography 
                variant={isVerySmallScreen ? "subtitle1" : "h6"} 
                noWrap 
                component="div"
                sx={{ fontSize: styles.fontSize.title }}
              >
                {selectedSection}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer en dispositivos móviles - usando SwipeableDrawer para mejor UX */}
      {isMobile ? (
        <SwipeableDrawer
          variant="temporary"
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
          disableBackdropTransition={!isSmallScreen}
          disableDiscovery={isSmallScreen}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en dispositivos móviles
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              backgroundColor: '#121212',
              color: 'white',
            },
          }}
        >
          {drawerContent}
        </SwipeableDrawer>
      ) : (
        /* Drawer permanente en desktop */
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#121212',
              color: 'white',
              borderRight: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      
      {/* Contenido principal - AJUSTADO PARA OCUPAR CORRECTAMENTE EL ESPACIO */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          flexShrink: 1,
          flexBasis: 0,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          height: '100%',
          backgroundColor: mode === 'dark' ? '#121212' : '#f5f5f5',
          mt: isMobile ? (isVerySmallScreen ? '56px' : '64px') : 0, // Espacio para la AppBar en móviles
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {/* Cabecera de la sección en desktop */}
        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: styles.padding,
            borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`
          }}>
            <SettingsIcon sx={{ 
              mr: 2, 
              fontSize: isLg ? 24 : 28, 
              color: mode === 'dark' ? '#90CAF9' : '#1976D2' 
            }} />
            <Typography 
              variant={isLg ? "h6" : "h5"} 
              component="h1" 
              sx={{ 
                fontWeight: 'medium',
                fontSize: isLg ? '1.15rem' : '1.5rem'
              }}
            >
              {selectedSection}
            </Typography>
          </Box>
        )}
        
        {/* Contenido dinámico según la sección seleccionada */}
        <Container 
          maxWidth={false} 
          disableGutters 
          sx={{ 
            padding: styles.padding,
            overflow: 'auto',
            flexGrow: 1,
          }}
        >
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default MenuConfig;