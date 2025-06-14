import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiClient from "@/service/api/apiClient";
import { Checkbox } from "@/components/ui/checkbox";
import { registerSchema } from "@/types/zodSchema/RegisterSchema";
import { z } from "zod";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: "",
    plainPassword: "",
    username: "",
    first_name: "",
    last_name: "",
    terms: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validation en temps réel pour le champ modifié
    if (errors[name]) {
      try {
        const fieldSchema = registerSchema.pick({ [name]: true } as any);
        fieldSchema.parse({ [name]: type === 'checkbox' ? checked : value });
        setErrors(prev => ({ ...prev, [name]: "" }));
      } catch (error) {
        // Garde l'erreur existante jusqu'à ce que la validation passe
      }
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, terms: checked }));
    if (errors.terms && checked) {
      setErrors(prev => ({ ...prev, terms: "" }));
    }
  };

  const Navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      // Validation avec Zod
      const validatedData = registerSchema.parse(formData);
      
      // Enlever le champ terms avant l'envoi à l'API
      const dataToSend = {
        email: validatedData.email,
        plainPassword: validatedData.plainPassword,
        username: validatedData.username,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name
      };

      await apiClient.post("/users", dataToSend);
      toast({ title: "Inscription réussie, Vous pouvez maintenant vous connecter", variant: "success" });
      Navigate("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Erreurs de validation Zod
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Erreur de validation",
          description: "Veuillez corriger les erreurs dans le formulaire",
          variant: "destructive"
        });
      } else if (error instanceof Error && 'response' in error) {
        // Erreurs API
        const apiError = error as any;
        if (apiError.response?.data?.message) {
          if (apiError.response.data.message.includes('email')) {
            setErrors({ email: "Cette adresse email est déjà utilisée" });
          } else if (apiError.response.data.message.includes('username')) {
            setErrors({ username: "Ce nom d'utilisateur est déjà pris" });
          } else {
            setErrors({ general: apiError.response.data.message });
          }
        } else {
          setErrors({ general: "Une erreur est survenue lors de l'inscription" });
        }
        toast({
          title: "Erreur d'inscription",
          description: "Veuillez vérifier vos informations",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <img
              src="/Logo-share-loc.svg"
              alt="Logo de l'application"
              className="mx-auto mb-3"
            />
            <h1 className="text-3xl font-bold">Créer un compte</h1>
            <p className="text-muted-foreground">
              Entrez vos informations pour créer un compte
            </p>
          </div>
          <div className=" max-h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@email.com"
                    required
                    disabled={isLoading}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Jean"
                      required
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={errors.first_name ? "border-red-500" : ""}
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm">
                        {errors.first_name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="last_name"
                      placeholder="Dupont"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={errors.last_name ? "border-red-500" : ""}
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm">{errors.last_name}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="jean_dupont"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={errors.username ? "border-red-500" : ""}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    name="plainPassword"
                    placeholder="********"
                    required
                    value={formData.plainPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={errors.plainPassword ? "border-red-500" : ""}
                  />
                  {errors.plainPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.plainPassword}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Le mot de passe doit contenir au moins 12 caractères avec
                    une minuscule, une majuscule et un chiffre
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={handleTermsChange}
                      disabled={isLoading}
                    />
                    <Label htmlFor="terms">
                      Accepter les{" "}
                      <Link className="underline" to={"/cgy"}>
                        conditions d'utilisation
                      </Link>
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-sm">{errors.terms}</p>
                  )}
                </div>
                {errors.general && (
                  <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                    {errors.general}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Création en cours..." : "Créer un compte"}
                </Button>
              </form>
              <div className="text-center text-sm">
                Vous avez déjà un compte?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login_picture.jpg"
          alt="Image d'une femme entourée de cartons"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
