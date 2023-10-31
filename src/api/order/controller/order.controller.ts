import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Post,
  Body,
  DefaultValuePipe,
} from '@nestjs/common';
import { OrderService } from '../services/order.services';
import { CreateOrderDto } from '../dto/order.dto';
import { Order } from 'src/database/entities/orders.entity';
import { PaginationDto } from 'src/api/shared/dto/pagination.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getPaginatedOrders(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationDto> {
    return this.orderService.getAllOrders(page, limit);
  }
}
