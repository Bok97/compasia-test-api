import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductVariant } from './product_variants.entity';

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @OneToMany(() => ProductVariant, (variant) => variant.color)
  public variants: ProductVariant[];
}
