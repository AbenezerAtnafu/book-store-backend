import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private booksService: BooksService,
    private usersService: UsersService,
  ) {}

  findAll(userId?: string): Promise<Order[]> {
    if (userId)
      return this.ordersRepository.find({
        relations: ['book', 'user'],
        where: {
          user: { id: userId },
        },
      });

    return this.ordersRepository.find({ relations: ['book', 'user'] });
  }

  findOne(id: string): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.ordersRepository.delete(id);
  }

  async create(
    createOrderDto: CreateOrderDto,
    userId: string,
  ): Promise<Order | BadRequestException> {
    const order = new Order();

    const book = await this.booksService.findOne(createOrderDto.book);
    const user = await this.usersService.findOne(userId);

    if (book.price > user.point)
      return new BadRequestException('Insufficient balance');

    order.book = book;
    order.user = user;

    await this.usersService.minusPoint(user.id, book.price);

    return this.ordersRepository.save(order);
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });

    order.orderStatus = OrderStatus.Cancelled;

    return this.ordersRepository.save(order);
  }
}
