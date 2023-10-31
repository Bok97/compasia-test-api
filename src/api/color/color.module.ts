import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from 'src/database/entities/product_colors.entity';
import { ProductColorController } from './controller/color.controller';
import { ProductColorService } from './services/color.services';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColor])],
  controllers: [ProductColorController],
  providers: [ProductColorService],
})
export class ProductColorModule {}
