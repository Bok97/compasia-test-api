import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from './order_details.entity';
import { ProductVariant } from './product_variants.entity';
import { Brand } from './brands.entity';
import { Category } from './categories.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'price' })
  public price: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  public orderDetails: OrderDetail[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  public variants: ProductVariant[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  public brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  public category: Category;
}
