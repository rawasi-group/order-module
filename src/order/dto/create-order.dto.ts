export class CreateOrderDto {
  reference_id: string;
  user_id: string;
  amount: string;
}
export class CreatedOrderTransactionDto {
  order_id: string;
  amount: string;
  payment_method: string;
}
