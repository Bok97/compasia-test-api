import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Order } from './orders.entity';
import { Product } from './products.entity';
import { ProductColor } from './product_colors.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  public order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  @Column({ name: 'price' })
  public price: number;

  @ManyToOne(() => ProductColor)
  @JoinColumn({ name: 'color_id' })
  public color: ProductColor;
}
