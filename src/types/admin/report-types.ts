export interface Report {
  id: number;
  reporter: {
    id: number;
    email: string;
    username: string;
  };
  motif: string;
  reporter_message: string;
  created_at: string;
  status: string;
  message?: {
    id: number;
    content: string;
  };
  review?: {
    id: number;
    content: string;
  };
  item?: {
    id: number;
    title: string;
  };
  user?: {
    id: number;
    email: string;
    username: string;
  };
}
