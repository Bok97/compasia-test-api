import { Controller, Get } from '@nestjs/common';
import { BrandService } from '../services/brand.services';
import { BrandDto } from '../dto/brand.dto';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAll(): Promise<BrandDto[]> {
    return this.brandService.findAll();
  }
}
