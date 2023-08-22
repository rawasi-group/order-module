import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './dto/order.dto';
import {
  CreatedOrderTransactionDto,
  CreateOrderDto,
} from './dto/create-order.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.status = OrderStatus.PENDING;
    order.amount = createOrderDto.amount;
    order.reference_id = createOrderDto.reference_id;
    order.user_id = createOrderDto.user_id;
    return await this.orderRepo.save(order);
  }
  async createOrderTransaction(
    createdOrderTransactionDto: CreatedOrderTransactionDto,
  ) {
    const transaction = new Transaction();
    transaction.order_id = createdOrderTransactionDto.order_id;
    transaction.amount = createdOrderTransactionDto.amount;
    transaction.payment_method = createdOrderTransactionDto.payment_method;
    return await this.transactionRepo.save(transaction);
  }

  async confirm(transaction: Transaction) {
    const order = transaction.order;
    if (order.status === OrderStatus.PAID) throw new Error('Order Paid Before');
    order.status = OrderStatus.PAID;
    order.payment_method = transaction.payment_method;
    transaction.status = OrderStatus.PAID;

    await this.orderRepo.save(order);
    await this.transactionRepo.save(transaction);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
  async getTransactionById(id: string) {
    return await this.transactionRepo.findOne({
      where: { id },
      relations: ['order'],
    });
  }
  findTransactionsByID(id: string) {
    return this.transactionRepo.find({
      where: { id },
      relations: ['order'],
    });
  }
  findByUserID(user_id: string) {
    return this.orderRepo.find({
      where: { user_id },
    });
  }
  async findTransactionsByUserID(user_id: string) {
    const orders = await this.orderRepo.find({
      where: { user_id },
    });
    const ids = [];
    orders.map((order) => ids.push(order.id));
    return this.transactionRepo.find({
      where: { id: In([...ids]) },
    });
  }
  findByReferenceID(reference_id: string): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['transactions'],
      where: { reference_id },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    console.info(updateOrderDto);
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
