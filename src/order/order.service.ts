import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './dto/order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderController } from './order.controller';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.status = OrderStatus.PENDING;
    order.amount = createOrderDto.amount;
    order.reference_id = createOrderDto.reference_id;
    order.user_id = createOrderDto.user_id;
    return await this.orderRepo.save(order);
  }

  async confirm(id: string) {
    console.info(id);
    const order = await this.orderRepo.findOne({
      where: {
        id,
      },
    });

    order.status = OrderStatus.PAID;

    await this.orderRepo.save(order);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
  findByUserID(user_id: string) {
    return this.orderRepo.find({
      where: { user_id },
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
