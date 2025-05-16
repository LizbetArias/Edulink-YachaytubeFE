import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider,
  useTheme,
  Link,
  CircularProgress,
  Alert,
  Snackbar,
  alpha
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Google } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Color verde personalizado para el botón
  const greenButtonColor = '#8CF534';
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  
  // Estados para el focus de los inputs
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!email) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email inválido');
      isValid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        const success = await login(email, password);
        
        if (success) {
          // Redirección gestionada automáticamente por el AuthContext
          console.log('Login exitoso');
        } else {
          setError('Credenciales inválidas');
          setShowError(true);
        }
      } catch (err) {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
        setShowError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login con ${provider}`);
    // Implementar autenticación con proveedores sociales
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#191919',
        padding: 2,
        backgroundImage: 'linear-gradient(135deg, rgba(25, 25, 25, 0.95), rgba(16, 16, 16, 0.97))',
        backgroundSize: 'cover',
      }}
    >
      <Card 
        sx={{
          maxWidth: 450,
          width: '100%',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.06)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 4,
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01))',
            WebkitMask: 
              'linear-gradient(#fff 0 0) content-box, ' +
              'linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ 
              color: 'white',
              textShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'
            }}>
              Inicia Sesión
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'rgba(255, 255, 255, 0.85)',
              mb: 1 
            }}>
              Recuerda ingresar con tu cuenta educativa
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Email Input Mejorado - Con borde iluminado pero sin iluminación interna */}
            <Box 
              sx={{ 
                position: 'relative', 
                mb: 3.5,
                borderRadius: 2.5,
                border: emailFocused 
                  ? `2px solid ${greenButtonColor}` 
                  : '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: emailFocused 
                  ? `0 0 15px ${alpha(greenButtonColor, 0.4)}` 
                  : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 1.5,
                          backgroundColor: emailFocused ? alpha(greenButtonColor, 0.2) : 'rgba(255, 255, 255, 0.05)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Email 
                          sx={{ 
                            color: emailFocused ? greenButtonColor : 'rgba(255, 255, 255, 0.7)',
                            transition: 'color 0.3s ease',
                          }} 
                        />
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  position: 'relative',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 2,
                    height: 60,
                    padding: '0 16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Eliminamos el borde del input
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.06)', // Sin brillo interior al enfocar
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Sin borde interior al enfocar
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.8)',
                    transform: 'translate(60px, 20px) scale(1)',
                    '&.MuiInputLabel-shrink': {
                      transform: 'translate(60px, 8px) scale(0.75)',
                    },
                    '&.Mui-focused': {
                      color: greenButtonColor,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                    padding: '14px 14px 14px 12px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                  },
                  '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light,
                    marginLeft: 0,
                    fontWeight: 500,
                    marginTop: 1,
                    position: 'absolute',
                    bottom: -22,
                  }
                }}
              />
            </Box>
            
            {/* Password Input Mejorado - Con borde iluminado pero sin iluminación interna */}
            <Box 
              sx={{ 
                position: 'relative', 
                mb: 1,
                borderRadius: 2.5,
                border: passwordFocused 
                  ? `2px solid ${greenButtonColor}` 
                  : '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: passwordFocused 
                  ? `0 0 15px ${alpha(greenButtonColor, 0.4)}` 
                  : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <TextField
                fullWidth
                label="Contraseña"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 1.5,
                          backgroundColor: passwordFocused ? alpha(greenButtonColor, 0.2) : 'rgba(255, 255, 255, 0.05)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Lock 
                          sx={{ 
                            color: passwordFocused ? greenButtonColor : 'rgba(255, 255, 255, 0.7)',
                            transition: 'color 0.3s ease',
                          }} 
                        />
                      </Box>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                        sx={{ 
                          color: passwordFocused ? greenButtonColor : 'rgba(255, 255, 255, 0.7)',
                          transition: 'color 0.3s ease',
                          mr: 0.5,
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  position: 'relative',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 2,
                    height: 60,
                    padding: '0 16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Eliminamos el borde del input
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.06)', // Sin brillo interior al enfocar
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Sin borde interior al enfocar
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.8)',
                    transform: 'translate(60px, 20px) scale(1)',
                    '&.MuiInputLabel-shrink': {
                      transform: 'translate(60px, 8px) scale(0.75)',
                    },
                    '&.Mui-focused': {
                      color: greenButtonColor,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                    padding: '14px 14px 14px 12px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                  },
                  '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light,
                    marginLeft: 0,
                    fontWeight: 500,
                    marginTop: 1,
                    position: 'absolute',
                    bottom: -22,
                  }
                }}
              />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              my: 2.5,
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-checked': {
                        color: greenButtonColor,
                      },
                    }}
                  />
                }
                label="Recordarme"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.85)',
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.9rem',
                  } 
                }}
              />
              <Link 
                href="#" 
                underline="hover" 
                sx={{ 
                  color: greenButtonColor,
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    textShadow: `0 0 8px ${alpha(greenButtonColor, 0.6)}`,
                  }
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
            
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                mt: 2, 
                mb: 2,
                py: 1.75,
                borderRadius: 2.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: greenButtonColor,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(greenButtonColor, 0.85),
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 20px ${alpha(greenButtonColor, 0.4)}`,
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                boxShadow: `0 6px 15px ${alpha(greenButtonColor, 0.35)}`,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Iniciar sesión'
              )}
            </Button>
            
            {/* Añadiendo YACHAYTUBE en negrita y blanco */}
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
                letterSpacing: '1px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              YACHAYTUBE
            </Typography>
          </form>

          <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
            <Divider sx={{ flexGrow: 1, bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
            <Typography variant="body2" sx={{ px: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
              O continúa con
            </Typography>
            <Divider sx={{ flexGrow: 1, bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3.5 }}>
            {/* Solo dejamos el botón de Google */}
            <IconButton
              onClick={() => handleSocialLogin('Google')}
              sx={{ 
                border: 1, 
                borderColor: 'rgba(255, 255, 255, 0.12)',
                borderRadius: 2,
                p: 1.2,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              <Google />
            </IconButton>
          </Box>

          <Typography variant="body2" align="center" sx={{ 
            mt: 3, 
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.95rem'
          }}>
            ¿No tienes una cuenta?{' '}
            <Link 
              href="/register" 
              underline="hover" 
              sx={{ 
                color: greenButtonColor,
                fontWeight: 600,
                transition: 'all 0.2s',
                '&:hover': {
                  textShadow: `0 0 8px ${alpha(greenButtonColor, 0.6)}`,
                }
              }}
            >
              Regístrate aquí
            </Link>
          </Typography>
        </CardContent>
      </Card>

      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ 
            width: '100%',
            backgroundColor: alpha(theme.palette.error.main, 0.9),
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;