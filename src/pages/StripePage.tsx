import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const StripePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Mentions Légales
        </h1>
        <p className="text-muted-foreground text-lg">
          Informations légales obligatoires conformément à la loi française
        </p>
      </div>

      <div className="space-y-6">
        {/* Éditeur du site */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              1. Éditeur du site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Raison sociale :</h4>
              <p className="text-muted-foreground">Share'Loc</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Forme juridique :</h4>
              <p className="text-muted-foreground">
                SARL
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Adresse du siège social :</h4>
              <p className="text-muted-foreground">
                32 Boulevard du port
                <br />
                95000 Cergy
                <br />
                France
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Numéro de téléphone :</h4>
              <p className="text-muted-foreground">
                06 08 07 58 38
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Adresse e-mail :</h4>
              <p className="text-muted-foreground">sharelocontact@gmail.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Numéro SIRET :</h4>
              <p className="text-muted-foreground">3443385737</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                Numéro de TVA intracommunautaire :
              </h4>
              <p className="text-muted-foreground">3534578555</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Capital social :</h4>
              <p className="text-muted-foreground">
                1000 euros
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Directeur de publication */}
        <Card>
          <CardHeader>
            <CardTitle>2. Directeur de publication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Le directeur de publication est : Romain Ramanzin
            </p>
          </CardContent>
        </Card>

        {/* Hébergement */}
        <Card>
          <CardHeader>
            <CardTitle>3. Hébergement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Hébergeur :</h4>
              <p className="text-muted-foreground">
                Vercel Inc.
                <br />
                340 S Lemon Ave #4133
                <br />
                Walnut, CA 91789
                <br />
                États-Unis
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Site web :</h4>
              <Link
                to="https://vercel.com"
                className="text-primary hover:underline"
              >
                https://vercel.com
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Propriété intellectuelle */}
        <Card>
          <CardHeader>
            <CardTitle>4. Propriété intellectuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              L'ensemble de ce site relève de la législation française et
              internationale sur le droit d'auteur et la propriété
              intellectuelle. Tous les droits de reproduction sont réservés, y
              compris pour les documents téléchargeables et les représentations
              iconographiques et photographiques.
            </p>
            <p className="text-muted-foreground">
              La reproduction de tout ou partie de ce site sur un support
              électronique quel qu'il soit est formellement interdite sauf
              autorisation expresse du directeur de publication.
            </p>
            <p className="text-muted-foreground">
              Les marques et logos reproduits sur ce site sont déposés par les
              sociétés qui en sont propriétaires.
            </p>
          </CardContent>
        </Card>

        {/* Responsabilité */}
        <Card>
          <CardHeader>
            <CardTitle>5. Responsabilité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Les informations contenues sur ce site sont aussi précises que
              possible et le site est périodiquement remis à jour, mais peut
              toutefois contenir des inexactitudes, des omissions ou des
              lacunes.
            </p>
            <p className="text-muted-foreground">
              Si vous constatez une lacune, erreur ou ce qui parait être un
              dysfonctionnement, merci de bien vouloir le signaler par e-mail à
              l'adresse sharelocontact@gmail.com, en décrivant le problème de la
              manière la plus précise possible.
            </p>
            <p className="text-muted-foreground">
              Tout contenu téléchargé se fait aux risques et périls de
              l'utilisateur et sous sa seule responsabilité.
            </p>
          </CardContent>
        </Card>

        {/* Liens hypertextes */}
        <Card>
          <CardHeader>
            <CardTitle>6. Liens hypertextes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Les sites internet peuvent proposer des liens vers d'autres sites
              internet ou d'autres ressources disponibles sur Internet. Share'Loc ne dispose d'aucun moyen pour contrôler les
              sites en connexion avec ses sites internet.
            </p>
            <p className="text-muted-foreground">
              Share'Loc ne répond pas de la disponibilité de
              tels sites et sources externes, ni ne la garantit. Elle ne peut
              être tenue pour responsable de tout dommage, de quelque nature que
              ce soit, résultant du contenu de ces sites ou sources externes.
            </p>
          </CardContent>
        </Card>

        {/* Protection des données personnelles */}
        <Card>
          <CardHeader>
            <CardTitle>7. Protection des données personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              En France, les données personnelles sont notamment protégées par
              la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août
              2004, l'article L. 226-13 du Code pénal et la Directive Européenne
              du 24 octobre 1995.
            </p>
            <p className="text-muted-foreground">
              Sur le site Share'Loc.com, Share'Loc ne
              collecte des informations personnelles relatives à l'utilisateur
              que pour le besoin de certains services proposés par le site.
              L'utilisateur fournit ces informations en toute connaissance de
              cause.
            </p>
            <p className="text-muted-foreground">
              Conformément aux dispositions des articles 38 et suivants de la
              loi 78-17 du 6 janvier 1978 relative à l'informatique, aux
              fichiers et aux libertés, tout utilisateur dispose d'un droit
              d'accès, de rectification, de suppression et d'opposition aux
              données personnelles le concernant.
            </p>
            <p className="text-muted-foreground">
              Pour l'exercer, adressez-vous à : sharelocontact@gmail.com ou par
              courrier à 32 Boulevard du port 95000 Cergy.
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>8. Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Le site Share'Loc.com peut être amené à vous demander
              l'acceptation de cookies pour des besoins de statistiques et
              d'affichage. Un cookie est une information déposée sur votre
              disque dur par le serveur du site que vous visitez.
            </p>
            <p className="text-muted-foreground">
              Il contient plusieurs données qui sont stockées sur votre
              ordinateur dans un simple fichier texte auquel un serveur accède
              pour lire et enregistrer des informations. Certaines parties de ce
              site ne peuvent être fonctionnelles sans l'acceptation de cookies.
            </p>
          </CardContent>
        </Card>

        {/* Droit applicable */}
        <Card>
          <CardHeader>
            <CardTitle>
              9. Droit applicable et attribution de juridiction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Tout litige en relation avec l'utilisation du site Share'Loc.com est soumis au droit français. En dehors des cas où la loi ne
              le permet pas, il est fait attribution exclusive de juridiction
              aux tribunaux compétents de Cergy.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="text-center text-sm text-muted-foreground">
        <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        <p className="mt-2">
          <Link to="/" className="text-primary hover:underline">
            Retour à l'accueil
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StripePage;
