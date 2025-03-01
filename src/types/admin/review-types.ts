export interface Review {
  id: number;
  reviewer: {
    id: number;
    username: string;
    avatar: string | null;
  };
  reviewed: {
    id: number;
    username: string;
    avatar: string | null;
  };
  rate: number;
  content: string;
  created_at: string;
  reservation: any[];
}
