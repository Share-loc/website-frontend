import { useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Star } from "lucide-react";
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
import { Review } from "@/types/admin/review-types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewDetailDialog from "@/components/admin/review/review-detail-dialog";
import ReviewDeleteDialog from "@/components/admin/review/review-delete-dialog";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = () => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setReviews(response))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des évaluations : ",
          error
        )
      );
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Avis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Chercher un avis..."
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
                <TableHead>Date</TableHead>
                <TableHead>Évaluateur</TableHead>
                <TableHead>Évalué</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            { reviews.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Aucun avis trouvé
                </TableCell>
              </TableRow>
            )}

              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.id}</TableCell>
                  <TableCell>
                    {format(new Date(review.created_at), "dd MMM yyyy", {
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.reviewer.avatar || undefined}
                          alt={review.reviewer.username}
                        />
                        <AvatarFallback>
                          {review.reviewer.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{review.reviewer.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.reviewed.avatar || undefined}
                          alt={review.reviewed.username}
                        />
                        <AvatarFallback>
                          {review.reviewed.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{review.reviewed.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{review.rate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ReviewDetailDialog review={review} />
                      <ReviewDeleteDialog review={review} onReviewDeleted={fetchReviews} />
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

export default AdminReviewsPage;
