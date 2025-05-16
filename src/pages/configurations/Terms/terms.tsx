import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GavelIcon from "@mui/icons-material/Gavel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SecurityIcon from "@mui/icons-material/Security";
import CopyrightIcon from "@mui/icons-material/Copyright";
import BlockIcon from "@mui/icons-material/Block";
import PersonIcon from "@mui/icons-material/Person";

const Terms = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
          Términos y Condiciones
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Plataforma Educativa de Visualización de Videos
        </Typography>
        
        <Box my={3}>
          <Typography variant="body1" paragraph>
            Bienvenido a nuestra plataforma educativa. Al acceder y utilizar este sistema, 
            usted acepta cumplir con los siguientes términos y condiciones. Por favor, 
            lea cuidadosamente este documento antes de proceder.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box my={4}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GavelIcon sx={{ mr: 1 }} /> 1. Términos Generales
          </Typography>
          <Typography variant="body1" paragraph sx={{ pl: 4 }}>
            Esta plataforma está diseñada exclusivamente para fines educativos, permitiendo a los estudiantes
            visualizar contenido audiovisual asignado por sus profesores. Al registrarse y utilizar esta
            plataforma, usted reconoce que es un estudiante o docente afiliado a una institución educativa
            autorizada.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1 }} /> 2. Responsabilidades del Usuario
          </Typography>
          <List sx={{ pl: 4 }}>
            <ListItem>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Compromiso de visualización"
                secondary="Los estudiantes se comprometen a visualizar los videos completos asignados por sus profesores en los plazos establecidos."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Seguridad de la cuenta"
                secondary="El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades realizadas con su cuenta."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Prohibiciones"
                secondary="Queda estrictamente prohibido compartir credenciales de acceso, distribuir el contenido fuera de la plataforma o utilizar software para automatizar la visualización de videos."
              />
            </ListItem>
          </List>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <CopyrightIcon sx={{ mr: 1 }} /> 3. Propiedad Intelectual
          </Typography>
          <Typography variant="body1" paragraph sx={{ pl: 4 }}>
            Todo el contenido disponible en la plataforma está protegido por derechos de autor. 
            Los usuarios no están autorizados a descargar, copiar, modificar, distribuir o utilizar 
            el contenido fuera del contexto educativo previsto.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            4. Reglas de Uso del Sistema
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Para Estudiantes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem>
                  <ListItemText primary="Los estudiantes deben completar la visualización de los videos asignados en su totalidad." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="El sistema registra el progreso de visualización, y esta información es accesible para los profesores." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Es necesario mantener una conexión a internet estable durante la visualización." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Los estudiantes no pueden adelantar los videos más allá de lo permitido por el profesor." />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Para Profesores</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem>
                  <ListItemText primary="Los profesores pueden asignar videos específicos a grupos de estudiantes o estudiantes individuales." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Es posible establecer fechas límite para la visualización de los videos." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Los profesores tienen acceso a estadísticas de visualización de sus estudiantes." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="El contenido subido debe respetar los derechos de autor y ser apropiado para fines educativos." />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            5. Observaciones del Sistema
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Seguimiento de actividad" 
                  secondary="El sistema registra el tiempo de visualización, pausas y progreso general del estudiante."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Verificación de atención" 
                  secondary="Pueden aparecer cuestionarios o verificaciones aleatorias durante la reproducción para confirmar la atención del estudiante."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Estadísticas de uso" 
                  secondary="Se generan informes detallados sobre el comportamiento de visualización para mejorar la experiencia educativa."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Compatibilidad" 
                  secondary="El sistema es compatible con los navegadores principales y dispositivos móviles, pero se recomienda el uso de Chrome o Firefox actualizados."
                />
              </ListItem>
            </List>
          </Paper>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            6. Privacidad y Protección de Datos
          </Typography>
          <Typography variant="body1" paragraph sx={{ pl: 4 }}>
            Los datos recopilados se utilizan exclusivamente para fines educativos y de seguimiento 
            académico. No se compartirán con terceros sin consentimiento explícito, excepto cuando 
            sea requerido por ley. Para más información, consulte nuestra Política de Privacidad.
          </Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            7. Modificaciones a los Términos
          </Typography>
          <Typography variant="body1" paragraph sx={{ pl: 4 }}>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones 
            entrarán en vigor inmediatamente después de su publicación en la plataforma. Es responsabilidad 
            del usuario revisar periódicamente estos términos.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box my={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Al utilizar esta plataforma, usted confirma que ha leído, entendido y aceptado estos términos y condiciones.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Última actualización: 10 de mayo de 2025
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Terms;