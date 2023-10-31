import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config';
import { Category } from 'src/database/entities/categories.entity';
import { TypeOrmConfigService } from 'src/database/typeorm/typeorm.service';
import { SeedService } from './seed.service';
import { Product } from '../entities/products.entity';
import { ProductColor } from '../entities/product_colors.entity';
import { ProductVariant } from '../entities/product_variants.entity';
import { Brand } from '../entities/brands.entity';
import { Order } from '../entities/orders.entity';
import { OrderDetail } from '../entities/order_details.entity';
import { Seeder } from './seeders/product.seeder';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([
      Category,
      Product,
      ProductColor,
      ProductVariant,
      Brand,
      Order,
      OrderDetail,
    ]),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
  ],
  controllers: [],
  providers: [SeedService, Seeder],
})
export class SeedModule {}
