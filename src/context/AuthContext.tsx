import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Comprobar si hay un usuario en sesión al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Comprueba si hay un token guardado en localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
          // En una aplicación real, aquí verificarías el token con el backend
          // Por ahora, simplemente asumimos que es válido si existe
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // En una aplicación real, aquí harías una llamada API para autenticar
      // Simulamos un login exitoso después de un retraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usuario de ejemplo - en una app real vendría del backend
      const authenticatedUser = {
        id: '1',
        email: email,
        name: email.split('@')[0], // Usamos parte del email como nombre de ejemplo
      };
      
      // Guardar información de sesión
      localStorage.setItem('authToken', 'demo-token-123');
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      
      setUser(authenticatedUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;