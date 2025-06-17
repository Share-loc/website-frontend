import SEO from "@/components/SEO/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Globe, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

function SettingsPage() {
  return (
    <>
      <SEO 
        title="Paramètres"
        description="Gérez vos paramètres et préférences sur ShareLoc"
        keywords="paramètres, compte, préférences, ShareLoc"
        canonicalUrl="/settings"
      />
      <Link
        to="/profile"
        className="inline-flex items-center mb-6 text-sm hover:text-primary"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Retour au profil
      </Link>

      <div className="mx-auto mb-10 max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold">Paramètres du compte</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex gap-2 items-center">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Profil</CardTitle>
              </div>
              <CardDescription>
                Gérez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button
                variant="ghost"
                className="justify-start px-4 h-9"
                asChild
              >
                <Link to="/profile/edit">Modifier le profil</Link>
              </Button>
              <Button variant="ghost" className="justify-start px-4 h-9">
                Vérification d'identité
              </Button>
              <Button variant="ghost" className="justify-start px-4 h-9">
                Compte professionnel
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex gap-2 items-center">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifs">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des emails pour les demandes de location et messages
                  </p>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifs">Notifications push</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des notifications sur votre appareil
                  </p>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
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
              <div className="flex gap-2 items-center">
                <Lock className="w-5 h-5 text-primary" />
                <CardTitle>Sécurité</CardTitle>
              </div>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button
                variant="ghost"
                className="justify-start px-4 h-9"
                asChild
              >
                <Link to="/profile/edit">Changer le mot de passe</Link>
              </Button>
              <Button variant="ghost" className="justify-start px-4 h-9">
                Authentification à deux facteurs
              </Button>
              <Button variant="ghost" className="justify-start px-4 h-9">
                Appareils connectés
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="pb-3">
              <div className="flex gap-2 items-center">
                <CreditCard className="w-5 h-5 text-primary" />
                <CardTitle>Paiements</CardTitle>
              </div>
              <CardDescription>
                Gérez vos méthodes de paiement et transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button variant="ghost" className="justify-start px-4 h-9">
                Méthodes de paiement
              </Button>
              <Button variant="ghost" className="justify-start px-4 h-9">
                Historique des transactions
              </Button>
              <Button variant="ghost" className="justify-start px-4 h-9">
                Coordonnées de facturation
              </Button>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="pb-3">
              <div className="flex gap-2 items-center">
                <Globe className="w-5 h-5 text-primary" />
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
              <div className="flex justify-between items-center">
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

          <div className="flex flex-col gap-2 items-start pt-4">
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
