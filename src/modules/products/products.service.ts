import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProductsService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string) {

    // if the product under this id is actually exist
    const product = await this.prisma.product.findUnique({where: {id},select: {
      id: true,
      name: true,
      Review: true,

      
      description: true,
      price : true,
      stock: true,
    },
    
    
  },
  
) 

    
    // if not, throw an error
    if (!product){
      throw new NotFoundException("No Product found under this ID")
    }
    return product

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

 async deleteProduct(productId: string){
  await this.prisma.product.delete({
    where: {id : productId },
  });
  return { message : 'Product deleted Successfully'};
 }
}
