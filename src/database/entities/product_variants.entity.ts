import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './products.entity';
import { ProductColor } from './product_colors.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  @ManyToOne(() => ProductColor, (color) => color.variants)
  @JoinColumn({ name: 'color_id' })
  public color: ProductColor;
}
