import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentReviewsProps {
    reviews: any;
}

export default function RecentReviews({ reviews }: RecentReviewsProps) {
    return (
    <div className="space-y-4">
      {Object.keys(reviews).length === 0 ? (
        <p>Vous n'avez pas encore d'annonces.</p>
      ) : (
        reviews.map((review: any) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-2">
              <Avatar>
                <AvatarImage
                  src={review.reviewer.avatar || undefined}
                  alt={`Avatar of reviewer ${review.reviewer.username}`}
                />
                <AvatarFallback>{review.reviewer.username ? review.reviewer.username.charAt(0).toUpperCase() : "" }</AvatarFallback>
              </Avatar>
              <div>
              <div className="font-semibold">{review.reviewer.username}</div>
                <div className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rate ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p>{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
