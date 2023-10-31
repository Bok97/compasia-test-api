import { Controller, Get } from '@nestjs/common';
import { ProductColorService } from '../services/color.services';
import { ColorDto } from '../dto/color.dto';

@Controller('colors')
export class ProductColorController {
  constructor(private readonly productColorService: ProductColorService) {}

  @Get()
  async findAll(): Promise<ColorDto[]> {
    return this.productColorService.findAll();
  }
}
