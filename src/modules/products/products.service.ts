import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProductsService {
  findOne(id: string) {

    // if the product under this id is actually exist
    // if not, throw an error

    // select the product info from the ID
    // select the reviews from the database for that specific product

    // return reviews and product
    
    console.log(id)

  }
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany({
      where: {
        stock: {
          gte: 1,
        },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        stock: true,
        price: true,
        description: true,

        _count: {
          select: {
            Review: true,
          },
        },
      },

      // include review count

      take: 20,
    });
  }
}
