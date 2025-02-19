import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }




  async create(createCartDto: CreateCartDto, userID: string) {
    let product = await this.prisma.product.findFirst({
      where: {
        id: createCartDto.productID
      }
    });

    if (!product) {
      throw new NotFoundException('No Product Found')
    }
    return await this.prisma.cart.create({
      data: {
        userId: userID,
        productId: createCartDto.productID

      }
    });


  }


  async findAll(userID: string) {
    return await this.prisma.cart.findMany({
      where: {
        userId: userID,
      },
      select : {
        id    :true,
        quantity : true,
        createdAt : true,
        product : {
          select :{
            id  : true,
            imageUrl : true,
            name : true
          }
        }
        
      },
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: string, isIncrementing: boolean) {
    let cardItem = await this.prisma.cart.findUnique({
      where: {
        id
      }
    });

    if (!cardItem) {
      throw new NotFoundException("No cart item found")
    }

    if (cardItem.quantity <= 1 && !isIncrementing) {
      return await this.prisma.cart.delete({
        where: {
          id
        }
      });
    }

    return await this.prisma.cart.update({
      where: {
        id
      },
      data: {
        quantity: isIncrementing ? cardItem.quantity + 1 : cardItem.quantity - 1
      }
    });





  }

  async remove(id: string, userID: string) {
    return await this.prisma.cart.delete({ where: { id: id, userId: userID } });
  }
}
