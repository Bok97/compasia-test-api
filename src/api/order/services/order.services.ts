import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, OrderListItemDto } from '../dto/order.dto';
import { OrderDetail } from 'src/database/entities/order_details.entity';
import { Product } from 'src/database/entities/products.entity';
import { PaginationDto } from 'src/api/shared/dto/pagination.dto';
import { ProductColor } from 'src/database/entities/product_colors.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const product = await this.productRepository.findOne({
      where: { id: createOrderDto.product.productId },
    });

    const color = await this.productColorRepository.findOne({
      where: { id: createOrderDto.product.colorId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const orderDetail = this.orderDetailRepository.create({
      product: product,
      price: createOrderDto.product.price * 100,
      color: color,
    });

    const order = this.orderRepository.create({
      totalAmount: createOrderDto.product.price * 100,
      orderDetails: [orderDetail],
    });
    return this.orderRepository.save(order);
  }

  async getAllOrders(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationDto> {
    const [results, total] = await this.orderRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['orderDetails', 'orderDetails.product', 'orderDetails.color'],
    });

    const data: OrderListItemDto[] = results.map((order) => {
      // Convert the order date to Malaysia time zone
      const malaysiaTime = moment(order.orderDate)
        .tz('Asia/Kuala_Lumpur')
        .format('YYYY-MM-DD HH:mm:ss');
      return {
        documentNumber: order.documentNumber,
        orderDateTime: malaysiaTime,
        products: order.orderDetails.map((detail) => ({
          id: detail.product.id.toString(),
          name: detail.product.name,
          color: detail.color.name,
          price: detail.product.price / 100,
        })),
      };
    });

    return {
      page,
      limit,
      total,
      data,
    };
  }
}
