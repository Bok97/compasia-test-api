import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { OrderDetail } from './order_details.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'transaction_date_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public orderDate: Date;

  @Column({ name: 'total_amount' })
  public totalAmount: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  orderDetails: OrderDetail[];

  @Column({ name: 'document_number', type: 'uuid', unique: true })
  public documentNumber: string;

  @BeforeInsert()
  generateDocumentNumber() {
    this.documentNumber = uuidv4();
  }
}
