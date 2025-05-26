import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/service/api/apiClient";
// import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function EditProfilePage() {
  const [userId, setUserId] = useState();
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [location, setLocation] = useState("");
  // const [bio, setBio] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des mots de passe si remplis
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        toast({
          title: "Erreur",
          description: "Veuillez saisir votre mot de passe actuel",
          variant: "destructive",
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        toast({
          title: "Erreur",
          description: "Les nouveaux mots de passe ne correspondent pas",
          variant: "destructive",
        });
        return;
      }

      if (newPassword.length < 8) {
        toast({
          title: "Erreur",
          description: "Le mot de passe doit contenir au moins 8 caractères",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      await apiClient.patch(`/users/${userId}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        // phone: phone,
        // location: location,
        // bio: bio,
        ...(newPassword && { plainPassword: newPassword }),
      });
      toast({ title: "Profil mis à jour", variant: "success" });
    } catch (error) {
      console.error("An error occurred while updating user", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    }
  };

  // Fonction pour déclencher le sélecteur de fichier
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Fonction pour gérer la sélection de fichier
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Vérification du type et de la taille du fichier
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une image",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 5Mo",
          variant: "destructive",
        });
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await apiClient.post(
          "/users/profile-picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Erreur lors du téléchargement de l'avatar");
        }

        toast({
          title: "Avatar mis à jour",
          variant: "success",
        });
      } catch (error) {
        console.error('Erreur:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour l'avatar",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <Link
        to="/profile"
        className="inline-flex items-center text-sm mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour au profil
      </Link>

      <div className="max-w-3xl mx-auto mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Modifier le profil</CardTitle>
            <CardDescription>
              Mettez à jour vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <img
                className="w-24 h-24 rounded-full border-4 border-white bg-[#f0f7f4] flex items-center justify-center text-4xl object-cover"
                src={avatar}
                alt="Photo de profil de l'utilisateur"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <Button variant="outline" size="sm" onClick={handleAvatarClick}>
                Changer la photo de profil
              </Button>
            </div>

            <Separator />

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Input id="location" defaultValue="Paris, France" />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="bio">À propos de moi</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  defaultValue="Passionné de bricolage et de jardinage. J'aime partager mes outils et découvrir de nouvelles personnes dans mon quartier."
                />
              </div> */}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sécurité</h3>

              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Annuler</Button>
            <Button onClick={handleSubmit}>
              Enregistrer les modifications
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default EditProfilePage;
