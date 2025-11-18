export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalAmount: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  user: User;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
};