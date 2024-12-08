export interface Conversation {
  user_id: number;
  user_avatar?: string | null;
  user_username: string;
  last_message: string;
  new_messages: boolean;
  last_message_created_at: string;
}

export interface Message {
  id: number;
  sender: {
    id: number;
    username: string;
    avatar?: string | null;
  };
  receiver: {
    id: number;
    username: string;
    avatar?: string | null;
  };
  content: string;
  created_at: string;
  is_read: boolean;
}
