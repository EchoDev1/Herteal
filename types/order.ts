import { CartItem } from './cart';

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  total: number;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}
