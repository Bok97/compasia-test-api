export class CreateOrderDto {
  readonly product: CreateOrderDetailDto;
  readonly totalAmount?: number; // Optionally calculate on the backend
}

export class CreateOrderDetailDto {
  readonly productId: number;
  readonly price: number;
  readonly colorId: number;
}

export class OrderListItemDto {
  documentNumber: string;
  orderDateTime: string;
  products: any[];
}

export class OrderItemDto {
  id: number;
  name: string;
  color: string;
}
