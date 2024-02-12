import { OrdersService } from './orders.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UseGuards,
  Request,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Request() req): Promise<Order[]> {
    const userId = req.user.sub;
    console.log(req.user);
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.remove(id);
  }

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
  ): Promise<Order | BadRequestException> {
    const userId = req.user.sub;
    return this.ordersService.create(createOrderDto, userId);
  }

  @Put('/cancel/:id')
  cancel(@Param('id') id: string): Promise<Order> {
    return this.ordersService.cancelOrder(id);
  }
}
