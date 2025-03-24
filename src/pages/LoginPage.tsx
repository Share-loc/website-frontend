import { useState, useContext } from 'react'
import AuthContext from '../components/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const LoginPage = () => {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast(); // Initialisation du toast

    const { userState, setUserState } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [responseMessage, setResponseMessage] = useState('')

    // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
    if (userState.isLogged) {
        return <Navigate to="/" replace />;
    }

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/password/request`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: resetEmail }),
          });
    
          if (response.ok) {
            toast({
              title: 'Succès',
              description: 'Un lien de réinitialisation a été envoyé à votre adresse email.',
              variant: 'success',
            });
            setIsResetDialogOpen(false); // Masquer la popup
          } else {
            const errorData = await response.json();
            toast({
              title: 'Erreur',
              description: errorData.message || 'Une erreur est survenue.',
              variant: 'destructive',
            });
          }
        } catch (error) {
          toast({
            title: 'Erreur',
            description: 'Impossible de traiter votre demande. Veuillez réessayer plus tard.',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login_check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                
                // Fetch user data after successful login
                try {
                    const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
                        headers: {
                            Authorization: `Bearer ${data.token}`
                        }
                    });
                    const userData = await userResponse.json();
                    
                    setUserState({
                        isLogged: true,
                        avatar: userData.avatar,
                        username: userData.username,
                    });
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    setUserState({ isLogged: true });
                }
            } else {
                const errorData = await response.json();
                setResponseMessage('Login failed: ' + errorData.message);
            }
        } catch (error) {
            setResponseMessage('An error occurred: ' + error);
        }
    }

    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex items-center justify-center flex-1">
            <div className="w-full max-w-xs">
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
                method="POST"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <img
                    src="/public/Logo-share-loc.svg"
                    alt="Logo de l'application"
                    className="mx-auto mb-3"
                  />
                  <h1 className="text-3xl font-bold">Connectez vous</h1>
                  <p className="text-sm text-balance text-muted-foreground">
                    Entrez vos identifiants pour vous connecter
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@exemple.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Button
                        type="button"
                        variant={'link'}
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                        onClick={() => setIsResetDialogOpen(true)}
                      >
                        Mot de passe oublié ?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  {responseMessage && (<p className="text-xs italic text-red-500">{responseMessage}</p>)}
                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                </div>
                <div className="text-sm text-center">
                  Vous n'avez pas de compte ?{" "}
                  <Link to="/register" className="font-medium text-primary underline underline-offset-4">
                    Créer un compte
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="../../public/login_picture.jpg"
            alt="Image d'une femme entourée de cartons"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        {/* Dialog pour la réinitialisation du mot de passe */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mot de passe oublié</DialogTitle>
            <DialogDescription>Entrez votre adresse email pour recevoir un lien de réinitialisation</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="resetEmail">Email</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="m@exemple.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[#F26522] hover:bg-[#d55314]" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le lien de réinitialisation"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      </div>
    );
}

export default LoginPage