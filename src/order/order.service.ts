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
import { TransactionLog } from './entities/transaction_log.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(TransactionLog)
    private readonly transactionLogRepo: Repository<TransactionLog>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.status = OrderStatus.PENDING;
    order.amount = createOrderDto.amount;
    order.reference_id = createOrderDto.reference_id;
    order.user_id = createOrderDto.user_id;
    order.payment_method = createOrderDto.payment_method;
    return await this.orderRepo.save(order);
  }
  async createOrderTransaction(
    createdOrderTransactionDto: CreatedOrderTransactionDto,
  ) {
    const transaction = new Transaction();
    transaction.order_id = createdOrderTransactionDto.order_id;
    transaction.amount = createdOrderTransactionDto.amount;
    transaction.payment_method = createdOrderTransactionDto.payment_method;
    transaction.receipt = createdOrderTransactionDto.receipt;
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
  async reject(transaction: Transaction) {
    if (transaction.status === OrderStatus.REJECTED)
      throw new Error('Order Rejected Before');
    transaction.status = OrderStatus.REJECTED;
    await this.transactionRepo.save(transaction);
  }
  async expiry(transaction: Transaction) {
    if (transaction.status === OrderStatus.REJECTED)
      throw new Error('Order Rejected Before');
    transaction.status = OrderStatus.EXPIRED;
    await this.transactionRepo.save(transaction);
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepo.findOne({ where: { id } });
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

  async log_transaction(
    reference_id: string,
    type: string,
    state: string,
    data: any,
  ) {
    const log = new TransactionLog();
    log.reference = reference_id;
    log.state = state;
    log.data = data;
    log.type = type;
    await this.transactionLogRepo.save(log);
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
      where: { order_id: In([...ids]) },
    });
  }
  findByReferenceID(reference_id: string): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['transactions'],
      where: { reference_id },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.transactionRepo.update(id, updateOrderDto);
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
