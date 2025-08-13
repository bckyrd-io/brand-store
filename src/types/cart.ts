export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  details?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    [key: string]: string | number | undefined;
  };
  type?: 'reservation' | 'product';
}
