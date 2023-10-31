import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './products.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @OneToMany(() => Product, (product) => product.brand)
  public products: Product[];
}
