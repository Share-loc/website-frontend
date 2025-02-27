import { useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

const AdminUsersPape = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Get users
  const fetchUsers = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setUsers(response))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des Utilisateurs : ",
          error
        )
      );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                //   value={searchTerm}
                //   onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">Rechercher</Button>
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
                  <TableCell>{user.email}</TableCell>
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
      </CardContent>
    </Card>
  );
};

export default AdminUsersPape;