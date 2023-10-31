import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { OrderController } from './controller/order.controller';
import { OrderService } from './services/order.services';
import { Product } from 'src/database/entities/products.entity';
import { OrderDetail } from 'src/database/entities/order_details.entity';
import { ProductColor } from 'src/database/entities/product_colors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderDetail, ProductColor]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
