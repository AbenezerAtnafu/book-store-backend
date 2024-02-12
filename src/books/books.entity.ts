import { Order } from 'src/orders/orders.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({
    default:
      'https://ui.shadcn.com/_next/image?url=%2Fexamples%2Fcards-dark.png&w=3840&q=75',
  })
  cover: string;

  @Column()
  price: number;

  @Column()
  tags: string;

  @ManyToOne(() => User, (user) => user.books)
  creator: User;

  @OneToMany(() => Order, (order) => order.book)
  orders: Order[];
}
