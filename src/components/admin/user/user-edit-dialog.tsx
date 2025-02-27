import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/admin/user-types";
import { UserPen } from "lucide-react";
import { useEffect, useState } from "react";

interface UserEditDialogProps {
  user: User;
  onUserEdited: () => void;
}

export function UserEditDialog({ user, onUserEdited }: UserEditDialogProps) {
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [last_name, setLastName] = useState(user.last_name);
  const [first_name, setFirstName] = useState(user.first_name);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles);
  const [is_banned, setIsBanned] = useState(user.is_banned);
  const [is_pro, setIsPro] = useState(user.is_pro);

  useEffect(() => {
    setUsername(user.username);
    setLastName(user.last_name);
    setFirstName(user.first_name);
    setEmail(user.email);
    setRoles(user.roles);
    setIsBanned(user.is_banned);
    setIsPro(user.is_pro);
  }, [user, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            username: username,
            last_name: last_name,
            first_name: first_name,
            email: email,
            is_pro: is_pro,
            roles: roles,
            is_banned: is_banned,
          }),
        }
      );

      if (!response.ok) {
        console.error(
          "Erreur lors de la soumission de l'utilisateur : ",
          response.status
        );
        toast({
          title: "Erreur lors de la modification de l'utilisateur",
          content: "Une erreur est survenue lors de la modification de l'utilisateur",
          variant: "destructive",
        });
        return;
      } else {
        onUserEdited();
        setOpen(false);
        toast({
          title: "Utilisateur modifié avec succès",
          content: "L'utilisateur a été modifié avec succès",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de l'utilisateur : ", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edition du compte utilisateur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Nom</Label>
            <Input
              id="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="account_type">Type de compte</Label>
            <Select
              value={is_pro ? "true" : "false"}
              onValueChange={(value) => setIsPro(value === "true")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type de compte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Particulier</SelectItem>
                <SelectItem value="true">Professionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={roles.includes("ROLE_ADMIN") ? "ROLE_ADMIN" : "ROLE_USER"}
              onValueChange={(value) => {
                if (value === "ROLE_ADMIN") {
                  setRoles(["ROLE_USER", "ROLE_ADMIN"]);
                } else {
                  setRoles(["ROLE_USER"]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ROLE_USER">Utilisateur</SelectItem>
                <SelectItem value="ROLE_ADMIN">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Accès au compte</Label>
            <Select
              value={is_banned ? "true" : "false"}
              onValueChange={(value) => setIsBanned(value === "true")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un choix d'accès" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Activé</SelectItem>
                <SelectItem value="true">Désactivé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Sauvegarder les changements</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
