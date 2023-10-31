import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/database/entities/products.entity';
import { Brand } from 'src/database/entities/brands.entity';
import { Category } from 'src/database/entities/categories.entity';
import { ProductColor } from 'src/database/entities/product_colors.entity';
import { ProductVariant } from 'src/database/entities/product_variants.entity';

@Injectable()
export class Seeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductColor)
    private readonly productColorRepository: Repository<ProductColor>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,
  ) {}

  async seed() {
    // Seed Brand
    const apple = this.brandRepository.create({ name: 'Apple' });
    const sumsung = this.brandRepository.create({ name: 'Sumsung' });
    await this.brandRepository.save([apple, sumsung]);

    // Seed Category
    const sm = this.categoryRepository.create({ name: 'smartphones' });
    const tb = this.categoryRepository.create({ name: 'tablets' });
    await this.categoryRepository.save([sm, tb]);

    // Seed Product
    const products = [
      { name: 'iPhone 13', brand: apple, category: sm, price: 89900 },
      { name: 'iPhone 13 Pro', brand: apple, category: sm, price: 99900 },
      { name: 'iPhone 13 Pro Max', brand: apple, category: sm, price: 109900 },
      { name: 'iPhone 13 Mini', brand: apple, category: sm, price: 69900 },
      { name: 'iPhone 12', brand: apple, category: sm, price: 79900 },
      { name: 'iPhone 12 Pro', brand: apple, category: sm, price: 89900 },
      { name: 'iPhone 12 Pro Max', brand: apple, category: sm, price: 99900 },
      { name: 'iPhone 12 Mini', brand: apple, category: sm, price: 69900 },
      { name: 'Galaxy S22', brand: sumsung, category: sm, price: 89900 },
      { name: 'Galaxy S22 Ultra', brand: sumsung, category: sm, price: 99900 },
      { name: 'Galaxy S23', brand: sumsung, category: sm, price: 109900 },
      { name: 'Galaxy S23 Ultra', brand: sumsung, category: sm, price: 119900 },
      { name: 'Galaxy Note 20', brand: sumsung, category: sm, price: 79900 },
      { name: 'Galaxy Note 20 Ultra', brand: sumsung, category: sm, price: 88800 },
      { name: 'Galaxy Z Fold 3', brand: sumsung, category: sm, price: 109900 },
    ];
    await this.productRepository.save(products);

    // Seed Product Color
    const red = this.productColorRepository.create({ name: 'Red' });
    const blue = this.productColorRepository.create({ name: 'Blue' });
    const black = this.productColorRepository.create({ name: 'Black' });
    const white = this.productColorRepository.create({ name: 'White' });
    const pink = this.productColorRepository.create({ name: 'Pink' });
    await this.productColorRepository.save([red, blue, black, white, pink]);

    // Seed Product Variants
    const variants = [
      { product: products[0], color: red },
      { product: products[0], color: blue },
      { product: products[0], color: black },
      { product: products[0], color: white },
      { product: products[1], color: red },
      { product: products[1], color: blue },
      { product: products[1], color: black },
      { product: products[2], color: blue },
      { product: products[2], color: black },
      { product: products[2], color: white },
      { product: products[3], color: red },
      { product: products[3], color: blue },
      { product: products[3], color: black },
      { product: products[3], color: pink },
      { product: products[4], color: red },
      { product: products[4], color: blue },
      { product: products[4], color: black },
      { product: products[4], color: pink },
      { product: products[5], color: red },
      { product: products[5], color: blue },
      { product: products[5], color: black },
      { product: products[6], color: pink },
      { product: products[7], color: red },
      { product: products[7], color: blue },
      { product: products[7], color: black },
      { product: products[8], color: pink },
      { product: products[8], color: red },
      { product: products[8], color: blue },
      { product: products[8], color: black },
      { product: products[9], color: red },
      { product: products[9], color: blue },
      { product: products[9], color: black },
      { product: products[9], color: white },
      { product: products[10], color: red },
      { product: products[10], color: blue },
      { product: products[10], color: black },
      { product: products[10], color: pink },
      { product: products[11], color: red },
      { product: products[11], color: blue },
      { product: products[11], color: black },
      { product: products[11], color: pink },
      { product: products[11], color: white },
      { product: products[12], color: red },
      { product: products[12], color: blue },
      { product: products[12], color: black },
      { product: products[12], color: pink },
      { product: products[12], color: white },
      { product: products[13], color: black },
    ];
    await this.productVariantRepository.save(variants);
  }
}
