import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import apiClient from "@/service/api/apiClient";
import { useAuth } from "./context/AuthContext";

interface Review {
  id: number;
  reviewer: {
    id: number;
    username: string;
    avatar: string;
  };
  rate: number;
  content: string;
  created_at: string;
  reservation: {
    item: {
        title: string;
    }
  }
}

function UserReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Review[]>(`/users/${user?.id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  console.log(reviews);

  useEffect(() => {
    fetchReviews();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">
              {review.reviewer.username}
            </CardTitle>
            <CardDescription>
              {format(review.created_at, "dd MMMM yyyy")}
            </CardDescription>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rate
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{review.content}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Pour: <span className="font-medium">{review.reservation.item.title}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserReviews;
