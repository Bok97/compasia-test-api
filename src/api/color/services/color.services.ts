import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductColor } from 'src/database/entities/product_colors.entity';
import { Repository } from 'typeorm';
import { ColorDto } from '../dto/color.dto';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>,
  ) {}

  async findAll(): Promise<ColorDto[]> {
    return this.productColorRepository.find();
  }
}
