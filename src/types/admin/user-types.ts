export interface User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  roles: string[];
  created_at: string;
  is_verified: boolean;
  is_pro: boolean;
  is_banned: boolean;
}
