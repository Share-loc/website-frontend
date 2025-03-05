import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/admin/category-types";
import CategoryEditDialog from "@/components/admin/category/category-edit-dialog";
import CategoryDeleteDialog from "@/components/admin/category/category-delete-dialog";
import { getToken } from "@/const/func";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append("search", searchTerm);
    }

    fetch(`${import.meta.env.VITE_API_URL}/categories/admin/all?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      }})
      .then((response) => response.json())
      .then((response) => setCategories(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories : ", error)
      );
  },[searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Catégories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Chercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">Rechercher</Button>
          </div>
          <CategoryEditDialog onCategoryEdited={fetchCategories} />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Libelle</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <CategoryEditDialog category={category} onCategoryEdited={fetchCategories}>
                      </CategoryEditDialog>
                      <CategoryDeleteDialog
                        category={category}
                        onCategoryDeleted={fetchCategories}
                      />
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

export default AdminCategoriesPage;
