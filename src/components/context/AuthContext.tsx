import apiClient from "@/service/api/apiClient";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  created_at: string;
  is_verified: boolean;
  is_pro: boolean;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void
  loadUserData: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const response = await apiClient.get('/users/personal-data', );
      setUser(response.data);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    }
  }, []);

  // Vérification unique au chargement de l'app
  useEffect(() => {
    if (!hasCheckedAuth) {
      const checkAuth = async () => {
        try {
          await loadUserData();
        } finally {
          setIsLoading(false);
          setHasCheckedAuth(true);
        }
      };
      checkAuth();
    }
  }, [hasCheckedAuth, loadUserData]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await apiClient.post('/login_check', { email, password });
      await loadUserData();
    } catch (error) {
      throw new Error('Échec de la connexion');
    }
  }, [loadUserData]);

 const logout = useCallback(async () => {
    try {
      await apiClient.post('/logout')
    } catch (error) {
      console.error('Erreur lors du logout', error)
    }
    
    // Réinitialiser l'état
    setUser(null);
    window.location.href = '/';
  }, []);

  // Ne pas rendre les enfants tant que la vérification initiale n'est pas terminée
  if (isLoading) {
    return <div>Chargement...</div>; // Ou un composant de loading
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loadUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};