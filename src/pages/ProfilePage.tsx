import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserItems from "@/components/UserItems";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import UserReviews from "@/components/UserReviews";

interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User>();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/personal-data`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("An error occurred while fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center text-sm mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
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
              <p className="text-sm text-muted-foreground mb-4">
                Membre depuis{" "}
                {user ? format(user.created_at, "MMMM yyyy") : "-"}
              </p>

              <div className="flex justify-center gap-4 mb-6">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile/edit">Modifier le profil</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/settings">Paramètres</Link>
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+33 6 12 34 56 78</span>
                </div>
              </div>

              {/* <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">À propos</h3>
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
