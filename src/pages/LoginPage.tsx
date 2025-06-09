import { useEffect, useState } from 'react'
import { useAuth } from '../components/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import apiClient from '@/service/api/apiClient'

const LoginPage = () => {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast(); // Initialisation du toast

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]= useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer l'URL de redirection si elle existe
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await apiClient.post('/password/request', { email: resetEmail });

        if (response.status === 200) {
        toast({
          title: 'Succès',
          description: 'Un lien de réinitialisation a été envoyé à votre adresse email.',
          variant: 'success',
        });
        setIsResetDialogOpen(false);
        } else {
        toast({
          title: 'Erreur',
          description: response.data?.message || 'Une erreur est survenue.',
          variant: 'destructive',
        });
        }
      } catch (error: any) {
        toast({
        title: 'Erreur',
        description: error?.response?.data?.message || 'Impossible de traiter votre demande. Veuillez réessayer plus tard.',
        variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoginLoading(true);
        setError('');
        try {
          await login(email, password);
          navigate(from, {replace: true});
        } catch (error: any) {
          setError(error.message)
        } finally {
          setIsLoginLoading(false);
        }
    };

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  {error && (<p className="text-xs italic text-red-500">{error}</p>)}
                  <Button type="submit" className="w-full">
                    {isLoginLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      "Se connecter"
                    )}
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