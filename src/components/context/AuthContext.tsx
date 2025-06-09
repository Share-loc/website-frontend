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

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // Première requête : login_check - on gère ses erreurs spécifiquement
        await apiClient.post("/login_check", { email, password });

        // Deuxième requête : charger les données utilisateur
        try {
          await loadUserData();
        } catch (error) {
          console.error(
            "Erreur lors du chargement des données utilisateur:",
            error
          );
        }
      } catch (error: any) {
        console.log("Erreur complète:", error);
        console.log("Status code:", error?.response?.status);

        if (error?.response) {
          const status = error.response.status;
          switch (status) {
            case 401:
            case 404: // Ajouter ce cas pour token/refresh non trouvé
              throw new Error("Email ou mot de passe incorrect");
            case 429:
              throw new Error(
                "Trop de tentatives de connexion. Veuillez réessayer dans 5 minutes"
              );
            case 500:
              throw new Error("Erreur serveur. Veuillez réessayer plus tard.");
            default:
              throw new Error(
                "Une erreur est survenue. Veuillez réessayer plus tard."
              );
          }
        } else if (error?.request) {
          throw new Error(
            "Erreur de connexion. Vérifiez votre connexion internet."
          );
        } else {
          throw new Error("Une erreur inattendue est survenue.");
        }
      }
    },
    [loadUserData]
  );

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