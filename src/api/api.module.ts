import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SucessResponseInterceptor } from 'src/common/helper/sucess-response.interceptor';
import { ProductModule } from './product/product.module';
import { ErrorsFilter } from 'src/errors/errors.filter';
import { ProductColorModule } from './color/color.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './orderDetail/orderDetail.module';

@Module({
  imports: [
    ProductModule,
    ProductColorModule,
    BrandModule,
    CategoryModule,
    OrderModule,
    OrderDetailModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SucessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
  ],
})
export class ApiModule {}
