export type OrderStatus = 'new' | 'in_production' | 'completed';

export interface Order {
  id: string;
  customer_phone: string;
  product_name: string;
  engraving_text: string;
  status: OrderStatus;
  created_at: string;
}
