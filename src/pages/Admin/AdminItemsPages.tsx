import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item } from "@/types/admin/item-types";
import { Badge } from "@/components/ui/badge";
import ItemDetailDialog from "@/components/admin/item/item-detail-dialog";
import ItemDeleteDialog from "@/components/admin/item/item-delete-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const AdminItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const fetchItems = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append("search", searchTerm);
    }

    if (filter !== "all") {
      params.append("status", filter);
    }

    fetch(`${import.meta.env.VITE_API_URL}/items/admin/all?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setItems(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des annonces : ", error)
      );
  }, [searchTerm, filter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Annonces</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Chercher une annonce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">Rechercher</Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer - {filter === "all" ? "Tous" : filter === "waiting_for_approval" ? "Annonces en attente" : "Annonces en ligne"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Toutes les annonces
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("waiting_for_approval")}>
                Annonces en attente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("approved")}>
                Annonces en ligne
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Loueur</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>{item.price} €</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status != "approved" ? "default" : "secondary"
                      }
                    >
                      {item.status === "approved" ? "Approuvé" : "En attente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.user.username}
                    {item.user.is_verified && (
                      <Badge variant="outline" className="ml-2">
                        Vérifié
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ItemDetailDialog item={item} onItemValidated={fetchItems} />
                      <ItemDeleteDialog item={item} onDeleted={fetchItems} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminItemsPage;