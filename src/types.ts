export type OrderStatus = 'new' | 'production' | 'completed';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  shippingMethod: string;
  product: string;
  engravingText: string;
  status: OrderStatus;
}
