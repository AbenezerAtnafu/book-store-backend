import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Books[]> {
    return this.booksRepository.find();
  }

  async findAllWithPagination(
    skip: number,
    limit: number,
  ): Promise<[Books[], number]> {
    const qb = this.booksRepository.createQueryBuilder('book');

    const [books, total] = await qb.take(limit).skip(skip).getManyAndCount();

    return [books, total];
  }

  findOne(id: string): Promise<Books | null> {
    return this.booksRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async create(createBookDto: CreateBookDto): Promise<Books> {
    const book = new Books();
    book.title = createBookDto.title;
    book.cover = createBookDto.cover;
    book.price = createBookDto.price;
    book.tags = createBookDto.tags;

    const user = await this.usersService.findOne(createBookDto.userId);
    book.creator = user;

    return this.booksRepository.save(book);
  }
}
