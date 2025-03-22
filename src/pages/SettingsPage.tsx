import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, CreditCard, Globe, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

function SettingsPage() {
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
        <h1 className="text-2xl font-bold mb-6">Paramètres du compte</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profil</CardTitle>
              </div>
              <CardDescription>
                Gérez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button
                variant="ghost"
                className="justify-start h-9 px-4"
                asChild
              >
                <Link to="/profile/edit">Modifier le profil</Link>
              </Button>
              <Button variant="ghost" className="justify-start h-9 px-4">
                Vérification d'identité
              </Button>
              <Button variant="ghost" className="justify-start h-9 px-4">
                Compte professionnel
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifs">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des emails pour les demandes de location et messages
                  </p>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifs">Notifications push</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des notifications sur votre appareil
                  </p>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-notifs">
                    Communications marketing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des offres et actualités de notre plateforme
                  </p>
                </div>
                <Switch id="marketing-notifs" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Sécurité</CardTitle>
              </div>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button
                variant="ghost"
                className="justify-start h-9 px-4"
                asChild
              >
                <Link to="/profile/edit">Changer le mot de passe</Link>
              </Button>
              <Button variant="ghost" className="justify-start h-9 px-4">
                Authentification à deux facteurs
              </Button>
              <Button variant="ghost" className="justify-start h-9 px-4">
                Appareils connectés
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Paiements</CardTitle>
              </div>
              <CardDescription>
                Gérez vos méthodes de paiement et transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button variant="ghost" className="justify-start h-9 px-4">
                Méthodes de paiement
              </Button>
              <Button variant="ghost" className="justify-start h-9 px-4">
                Historique des transactions
              </Button>
              <Button variant="ghost" className="justify-start h-9 px-4">
                Coordonnées de facturation
              </Button>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Préférences</CardTitle>
              </div>
              <CardDescription>Personnalisez votre expérience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Langue</Label>
                <RadioGroup
                  defaultValue="fr"
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fr" id="fr" />
                    <Label htmlFor="fr">Français</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="es" />
                    <Label htmlFor="es">Español</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Mode sombre</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer le thème sombre
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-start gap-2 pt-4">
            <Button
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-50"
            >
              Désactiver mon compte
            </Button>
            <p className="text-xs text-muted-foreground">
              La désactivation masquera temporairement votre profil et vos
              annonces.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
