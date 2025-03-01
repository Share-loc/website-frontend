import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Review } from "@/types/admin/review-types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye, Star } from "lucide-react";
import { useState } from "react";

interface ReviewDetailDialogProps {
  review: Review;
}

function ReviewDetailDialog({ review }: ReviewDetailDialogProps) {
  const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">Détails de l'avis #{review.id}</DialogTitle>
          <DialogDescription>
            Créé le {format(new Date(review.created_at), "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Évaluateur</h3>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-md">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.reviewer.avatar || undefined} alt={review.reviewer.username} />
                  <AvatarFallback>{review.reviewer.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{review.reviewer.username}</p>
                  <p className="text-xs text-slate-500">ID: {review.reviewer.id}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Évalué</h3>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-md">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.reviewed.avatar || undefined} alt={review.reviewed.username} />
                  <AvatarFallback>{review.reviewed.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{review.reviewed.username}</p>
                  <p className="text-xs text-slate-500">ID: {review.reviewed.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1">Note</h3>
            <div className="flex items-center bg-slate-50 p-3 rounded-md">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < review.rate ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{review.rate} / 5</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1">Contenu de l'avis</h3>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm">{review.content}</p>
            </div>
          </div>

          {review.reservation && review.reservation.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-1">Détails de la réservation</h3>
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="text-sm">
                  {/* Affichez ici les détails de la réservation si nécessaire */}
                  Réservation associée à cet avis
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewDetailDialog;
