import { useState, useContext } from 'react'
import AuthContext from '../components/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {
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
                // Save the token in the local storage
                localStorage.setItem('token', data.token);
                // Update the user state
                setUserState({
                    isLogged: true,
                })
                // La redirection se fera automatiquement grâce au if(userState.isLogged) ci-dessus
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
                  <h1 className="text-2xl font-bold">Connectez vous</h1>
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
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Mot de passe oublié ?
                      </a>
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
                  <a href="#" className="underline underline-offset-4">
                    Créer un compte
                  </a>
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
      </div>
    );
}

export default LoginPage