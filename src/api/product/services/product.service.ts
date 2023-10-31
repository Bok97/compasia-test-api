import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/api/shared/dto/pagination.dto';
import { Product } from 'src/database/entities/products.entity';
import { Repository } from 'typeorm';
import { ProductResponseDto } from '../dto/product-response.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(
    filter: ProductFilterDto,
    page: number,
    limit: number,
  ): Promise<PaginationDto> {
    // Start building the query
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .innerJoinAndSelect('variants.color', 'color')
      .leftJoinAndSelect('product.category', 'category') // Make sure you have a 'category' relation
      .leftJoinAndSelect('product.brand', 'brand');

    // Add name filter
    if (filter.name) {
      query.andWhere('LOWER(product.name) LIKE :name', {
        name: `%${filter.name.toLowerCase()}%`,
      });
    }

    // Add color filter
    if (filter.color) {
      query.andWhere('color.name = :color', { color: filter.color });
    }

    //Add category filter
    if (filter.category) {
      // Assuming you have a category relation or field
      query.andWhere('category.name = :category', {
        category: filter.category,
      });
    }

    // // Add brand filter
    if (filter.brand) {
      query.andWhere('brand.name = :brand', { brand: filter.brand });
    }
    const [results, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const data: ProductResponseDto[] = results.map((product) => ({
      productId: product.id,
      name: product.name,
      price: product.price / 100,
      brand: product.brand?.name ?? null,
      colors: product.variants.map((variant) => ({
        id: variant.color.id,
        name: variant.color.name,
      })),
    }));
    // Execute the query to get the products and the count
    return {
      page,
      limit,
      total,
      data,
    };
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id: id },
      relations: ['brand', 'category', 'variants.color'],
    });
  }
}
