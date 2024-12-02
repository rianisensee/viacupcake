export interface Order {
  id: number;
  numero: string;
  saborId: number;
  quantidade: number;
  itemPrice: number;
  subtotal: number;
  deliveryMethod: string;
  endereco?: string;
  complemento?: string;
  deliveryFee?: string;
  total: number;
  selectedPaymentMethod: string;
  date: Date;
  itensCompra: any[];
}