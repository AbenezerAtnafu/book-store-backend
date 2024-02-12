import { Books } from 'src/books/books.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export enum OrderStatus {
  Active = 'Active',
  Cancelled = 'Cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Books, (book) => book.orders)
  book: Books;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Active })
  orderStatus: OrderStatus;
}
