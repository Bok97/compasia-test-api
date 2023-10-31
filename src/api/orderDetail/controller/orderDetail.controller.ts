import { Controller } from '@nestjs/common';
import { OrderDetailService } from '../services/orderDetail.services';

@Controller('orderDetails')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}
}
