import { Books } from 'src/books/books.entity';
import { Order } from 'src/orders/orders.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Books, (books) => books.creator)
  books: Books[];

  @Column({ default: 100 })
  point: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
