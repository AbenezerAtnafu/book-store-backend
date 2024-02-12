import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Books]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [TypeOrmModule, BooksService],
})
export class BooksModule {}
