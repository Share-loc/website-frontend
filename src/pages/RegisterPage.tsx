import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiClient from "@/service/api/apiClient";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    plainPassword: "",
    username: "",
    first_name: "",
    last_name: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await apiClient.post("/users", formData);
      setResponseMessage("Registration successful!");
      toast({ title: "Inscription réussie, Vous pouvez maintenant vous connecter", variant: "success" });
      Navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setResponseMessage("Registration failed: " + error.response.data.message);
        console.error("Error:", error.response.data);
      } else {
        setResponseMessage("An error occurred: " + error.message);
        console.error("Error:", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <img
              src="/public/Logo-share-loc.svg"
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
                  />
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
                    />
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
                    />
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
                  />
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
                  />
                </div>
                {responseMessage && (
                  <div className="text-red-600 text-sm">{responseMessage}</div>
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
          src="../../public/login_picture.jpg"
          alt="Image d'une femme entourée de cartons"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
