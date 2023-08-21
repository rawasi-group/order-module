import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Transaction } from './entities/transaction.entity';
import { Transaction_log } from './entities/transaction_log.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Order, Transaction, Transaction_log]),
  ],

  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
