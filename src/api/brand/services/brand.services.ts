import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/database/entities/brands.entity';
import { Repository } from 'typeorm';
import { BrandDto } from '../dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<BrandDto[]> {
    return this.brandRepository.find();
  }
}
