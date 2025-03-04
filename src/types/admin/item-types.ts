export interface Item {
  id: number;
  user: {
    id: number;
    username: string;
    is_verified: boolean;
    email: string;
  };
  category: {
    name: string;
  };
  title: string;
  body: string;
  status: string;
  price: number;
  location: string;
  show_phone: boolean;
  item_pictures: {
    id: number;
    path: string;
    fullPath: string;
  }[];
  publicPhoneNumber: string;
  activeItemPictures: {
    id: number;
    path: string;
    fullPath: string;
  }[];
}
