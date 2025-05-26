import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/admin/category-types";
import CategoryEditDialog from "@/components/admin/category/category-edit-dialog";
import CategoryDeleteDialog from "@/components/admin/category/category-delete-dialog";
import { AdminPagination } from "@/components/admin/admin-pagination";
import apiClient from "@/service/api/apiClient";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCategories = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append("search", searchTerm);
    }

    params.append("limit", itemsPerPage.toString());

    if (currentPage > 1) {
      params.append("page", currentPage.toString());
    }

    apiClient
      .get(`/categories/admin/all?${params.toString()}`)
      .then((response) => {
        setCategories(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.total);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories : ", error)
      );
  }, [searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (itemsPerPage: string) => {
    setItemsPerPage(Number.parseInt(itemsPerPage));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Faire défiler vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
                onChange={handleSearchChange}
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
        <AdminPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} onItemsPerPageChange={handleItemsPerPageChange}/>
      </CardContent>
    </Card>
  );
};

export default AdminCategoriesPage;
