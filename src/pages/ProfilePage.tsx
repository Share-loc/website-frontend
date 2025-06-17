import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserItems from "@/components/UserItems";
import { format } from "date-fns";
import UserReviews from "@/components/UserReviews";
import { useAuth } from "@/components/context/AuthContext";
import SEO from "@/components/SEO/SEO";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      <SEO 
        title="Profil"
        description="Gérez votre profil et vos annonces sur ShareLoc"
        keywords="profil, compte, annonces, ShareLoc"
        canonicalUrl="/profile"
      />
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-sm hover:text-primary"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Retour à l'accueil
      </Link>

      <div className="grid gap-8 mb-10 md:grid-cols-3">
        <div>
          <Card>
            <CardHeader className="relative pb-0">
              <div className="bg-[#fae386] h-32 rounded-t-lg"></div>
              <div className="absolute top-24 left-1/2 -translate-x-1/2">
                <img
                  className="w-24 h-24 rounded-full border-4 border-white bg-[#deed76] flex items-center justify-center text-4xl object-cover"
                  src={user?.avatar}
                  alt="Avatar"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-16 text-center">
              <h2 className="text-xl font-bold">{user?.username}</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Membre depuis{" "}
                {user ? format(user.created_at, "MMMM yyyy") : "-"}
              </p>

              <div className="flex gap-4 justify-center mb-6">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile/edit">Modifier le profil</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/settings">Paramètres</Link>
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                {/* <div className="flex gap-2 justify-center items-center">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Paris, France</span>
                </div> */}
                <div className="flex gap-2 justify-center items-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                {/* <div className="flex gap-2 justify-center items-center">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+33 6 12 34 56 78</span>
                </div> */}
              </div>

              {/* <div className="pt-6 mt-6 border-t">
                <h3 className="mb-2 font-medium">À propos</h3>
                <p className="text-sm text-muted-foreground">
                  Passionné de bricolage et de jardinage. J'aime partager mes
                  outils et découvrir de nouvelles personnes dans mon quartier.
                </p>
              </div> */}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="items">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="items">Mes annonces</TabsTrigger>
              <TabsTrigger value="reviews">Mes avis</TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="space-y-4">
              <UserItems />
            </TabsContent>

            <TabsContent value="reviews"><UserReviews /></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
