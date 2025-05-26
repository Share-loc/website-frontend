import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Search } from "lucide-react";
import {
    Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileDialog } from "@/components/admin/user/user-profile-dialog";
import { UserDeleteDialog } from "@/components/admin/user/user-delete-dialog";
import { User } from "@/types/admin/user-types";
import { UserEditDialog } from "@/components/admin/user/user-edit-dialog";
import { AdminPagination } from "@/components/admin/admin-pagination";
import apiClient from "@/service/api/apiClient";

const AdminUsersPape = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Get users
  const fetchUsers = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);

    params.append("limit", itemsPerPage.toString());

    if (currentPage > 1) params.append("page", currentPage.toString());

    apiClient
      .get(`/users?${params.toString()}`)
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.total);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des Utilisateurs : ",
          error
        )
      );
  }, [searchTerm, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
        <CardTitle>Gestion des utilisateurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Chercher un utilisateur..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={fetchUsers}>Rechercher</Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Nom d'utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={user.avatar}
                        alt={`Photo de profil de l'utilisateur ${user.username}`}
                      />
                      <AvatarFallback>
                        {user.username.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell><div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />{user.email}</div></TableCell>
                  <TableCell>
                    <Badge
                      variant={"outline"}
                      className={`${
                        user.is_pro ? "bg-green-500" : "bg-blue-500 text-white"
                      }`}
                    >
                      {user.is_pro ? "Entreprise" : "Particulier"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.roles.includes("ROLE_ADMIN") ? (
                      <Badge variant={"outline"} className="bg-yellow-400">
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant={"outline"}>Utilisateur</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.is_banned ? (
                      <Badge variant={"destructive"}>Bloqué</Badge>
                    ) : (
                      <Badge variant={"outline"}>Actif</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <UserProfileDialog user={user} />
                      <UserEditDialog user={user} onUserEdited={fetchUsers}/>
                      <UserDeleteDialog user={user} onUserDeleted={fetchUsers}/>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <AdminPagination itemsPerPage={itemsPerPage} currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} onPageChange={handlePageChange} onItemsPerPageChange={handleItemsPerPageChange} />
      </CardContent>
    </Card>
  );
};

export default AdminUsersPape;