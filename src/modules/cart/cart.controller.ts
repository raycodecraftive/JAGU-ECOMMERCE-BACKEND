import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, BadRequestException } from '@nestjs/common';
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


  // www.be.jgu.com/cart/340?action=add
  // www.be.jgu.com/cart/340?action=remove

  @Patch(':id')
  update(@Param('id') id: string, @Query('action') action: string) {

    if(action !== 'add' && action !== 'remove') {
      throw new BadRequestException('Invalid Action');
    }


    
    return this.cartService.update(id, action == 'add');
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.cartService.remove(id, req.user);
  }
}
