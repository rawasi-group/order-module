export class CreateOrderDto {
  reference_id: string;
  user_id: string;
  amount: number;
}
export class CreatedOrderTransactionDto {
  order_id: string;
  amount: number;
  payment_method: string;
}
