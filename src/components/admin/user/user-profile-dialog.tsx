import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@/types/admin/user-types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye } from "lucide-react";

interface UserProfileProps {
  user: User;
}

export function UserProfileDialog({ user }: UserProfileProps) {
  return (
    // <div className="space-y-4">
    //   <div>
    //     <h3 className="font-semibold">N° Identifiant</h3>
    //     <p>{user.id}</p>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Avatar</h3>
    //     <Avatar>
    //       <AvatarImage
    //         src={user.avatar}
    //         alt={`Photo de profil de l'utilisateur ${user.username}`}
    //       />
    //       <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
    //     </Avatar>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Nom d'utilisateur</h3>
    //     <p>{user.username}</p>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Nom</h3>
    //     <p>{user.last_name}</p>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Prénom</h3>
    //     <p>{user.first_name}</p>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Email</h3>
    //     <p>{user.email}</p>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Type de profil</h3>
    //     <p>{user.is_pro ? 'professionnel' : 'Particulier'}</p>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Role sur la plateforme</h3>
    //     <p>{user.roles.includes("ROLE_ADMIN") ? 'Administrateur' : 'Utilisateur'}</p>
    //   </div>
    //   <div>
    //     <h3 className="font-semibold">Accès au compte</h3>
    //     <p>{user.is_banned ? 'Bloqué' : 'Authorisé'}</p>
    //   </div>
    // </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profil de l'utilisateur</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.username.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <p className="text-sm text-muted-foreground">Nom</p>
              <p className="font-medium">{user.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prénom</p>
              <p className="font-medium">{user.first_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nom d'utilisateur</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type de profil</p>
              <p className="font-medium">{user.is_pro ? 'professionnel' : 'Particulier'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium">{user.roles.includes("ROLE_ADMIN") ? 'Administrateur' : 'Utilisateur'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accès au compte</p>
              <p className="font-medium">{user.is_banned ? 'Bloqué' : 'Authorisé'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Création du compte</p>
              <p className="font-medium">{format(new Date(user.created_at), "dd MMMM yyyy 'à' HH:mm", { locale: fr } )}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Identifiant</p>
              <p className="font-medium">{user.id}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}