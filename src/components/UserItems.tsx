import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// import { Switch } from "./ui/switch";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/service/api/apiClient";
import { useAuth } from "./context/AuthContext";

interface Item {
  id: number;
  title: string;
  category: {
    name: string;
  };
  price: number;
  activeItemPictures: [
    {
      fullPath: string;
    }
  ];
  views: number;
  reservations: [any];
}

function UserItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Item[]>(`/users/${user?.id}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("An error occurred while fetching items", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [openAlertId, setOpenAlertId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
      toast({
        title: "Annonce supprimée",
        description: "L'annonce a bien été supprimée.",
        variant: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce : ", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'annonce.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Mes annonces ({items.length})</h2>
        <Link to="/create-item">
          <Button>Créer une annonce</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-32 h-24 sm:h-[150px] flex-shrink-0">
                  <img
                    src={item.activeItemPictures[0].fullPath}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.category.name}
                      </p>
                    </div>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/edit-item/${item.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() => setOpenAlertId(item.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-primary font-bold">
                      {item.price}€{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        / jour
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-muted-foreground">
                        {item.views} vues •{" "}
                        {item.reservations ? item.reservations.length : 0}{" "}
                        locations
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <Switch
                          id={`available-${item.id}`}
                          checked={item.available}
                        />
                        <span className="text-sm">
                          {item.available ? "Disponible" : "Indisponible"}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AlertDialog
        open={openAlertId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setOpenAlertId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Êtes-vous sûr de vouloir supprimer cette annonce ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'annonce sera définitivement
              supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (openAlertId) {
                  handleDelete(openAlertId);
                }
                setOpenAlertId(null);
              }}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default UserItems;
