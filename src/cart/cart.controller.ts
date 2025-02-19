import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JaguAuthGuard } from 'src/guards/auth.guard';
import { request } from 'http';

@UseGuards(JaguAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Req() req, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto,req.user);
  }

  @Get()
  findAll(@Req() req, ) {
    return this.cartService.findAll(req.user);
  }


  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.cartService.remove(id, req.user);
  }
}
