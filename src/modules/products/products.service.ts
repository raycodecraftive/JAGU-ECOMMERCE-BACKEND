import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProductsService {
  async findAllCategories() {

    return await this.prisma.productCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

  }
  async seedProducts() {


    // Create different shoe categories
    const shoeCategories = [
      { name: 'Running Shoes' },
      { name: 'Hiking Boots' },
      { name: 'Casual Sneakers' },
      { name: 'Formal Shoes' },
      { name: 'Sports Shoes' }
    ];

    console.log('Creating shoe categories...');

    // Create all categories and store them for reference
    const createdCategories = {};
    for (const category of shoeCategories) {
      const createdCategory = await this.prisma.productCategory.upsert({
        where: { id: "dedede" },
        update: {},
        create: {
          name: category.name,
        },
      });
      createdCategories[category.name] = createdCategory;
    }

    console.log('Successfully created shoe categories!');

    // Array of shoe products with appropriate categories
    const shoeProducts = [
      {
        name: 'Air Runner Pro',
        description: 'Lightweight running shoes with advanced cushioning technology for maximum comfort.',
        price: 129.99,
        stock: 45,
        imageUrl: 'https://example.com/images/air-runner-pro.jpg',
        categoryId: createdCategories['Running Shoes'].id,
      },
      {
        name: 'Marathon Elite',
        description: 'Professional marathon shoes with carbon fiber plate for energy return.',
        price: 189.99,
        stock: 25,
        imageUrl: 'https://example.com/images/marathon-elite.jpg',
        categoryId: createdCategories['Running Shoes'].id,
      },
      {
        name: 'Trail Blazer Hiking Boots',
        description: 'Waterproof hiking boots with rugged outsole for difficult terrain.',
        price: 159.99,
        stock: 30,
        imageUrl: 'https://example.com/images/trail-blazer.jpg',
        categoryId: createdCategories['Hiking Boots'].id,
      },
      {
        name: 'Mountain Explorer',
        description: 'Heavy-duty hiking boots with ankle support and thermal insulation.',
        price: 179.99,
        stock: 20,
        imageUrl: 'https://example.com/images/mountain-explorer.jpg',
        categoryId: createdCategories['Hiking Boots'].id,
      },
      {
        name: 'Urban Street Sneakers',
        description: 'Stylish casual sneakers with genuine leather upper, perfect for everyday wear.',
        price: 89.99,
        stock: 60,
        imageUrl: 'https://example.com/images/urban-street.jpg',
        categoryId: createdCategories['Casual Sneakers'].id,
      },
      {
        name: 'Classic Canvas Slip-ons',
        description: 'Simple and comfortable slip-on canvas shoes in multiple colors.',
        price: 49.99,
        stock: 75,
        imageUrl: 'https://example.com/images/canvas-slipons.jpg',
        categoryId: createdCategories['Casual Sneakers'].id,
      },
      {
        name: 'Formal Oxford Dress Shoes',
        description: 'Elegant leather dress shoes with classic oxford design for formal occasions.',
        price: 149.99,
        stock: 20,
        imageUrl: 'https://example.com/images/oxford-dress.jpg',
        categoryId: createdCategories['Formal Shoes'].id,
      },
      {
        name: 'Italian Leather Loafers',
        description: 'Premium handcrafted Italian leather loafers with cushioned insole.',
        price: 169.99,
        stock: 15,
        imageUrl: 'https://example.com/images/leather-loafers.jpg',
        categoryId: createdCategories['Formal Shoes'].id,
      },
      {
        name: 'Elite Basketball High-Tops',
        description: 'Professional basketball shoes with ankle support and responsive cushioning.',
        price: 179.99,
        stock: 25,
        imageUrl: 'https://example.com/images/basketball-hightops.jpg',
        categoryId: createdCategories['Sports Shoes'].id,
      },
      {
        name: 'Flex Fitness Trainers',
        description: 'Versatile training shoes designed for gym workouts and cross-training.',
        price: 119.99,
        stock: 40,
        imageUrl: 'https://example.com/images/fitness-trainers.jpg',
        categoryId: createdCategories['Sports Shoes'].id,
      },
    ];

    console.log('Starting to seed shoe products...');

    // Create all products in the database
    for (const product of shoeProducts) {
      await this.prisma.product.create({
        data: product,
      });
    }

    console.log('Successfully seeded 10 shoe products across different categories!');

    // Disconnect from the database

  }
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string) {

    // if the product under this id is actually exist
    const product = await this.prisma.product.findUnique({
      where: { id }, select: {
        id: true,
        name: true,
        Review: true,


        description: true,
        price: true,
        stock: true,
      },


    },

    )


    // if not, throw an error
    if (!product) {
      throw new NotFoundException("No Product found under this ID")
    }
    return product

    // select the product info from the ID
    // select the reviews from the database for that specific product

    // return reviews and product

    console.log(id)

  }
  constructor(private readonly prisma: PrismaService) { }

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
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },

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

  async deleteProduct(productId: string) {
    await this.prisma.product.delete({
      where: { id: productId },
    });
    return { message: 'Product deleted Successfully' };
  }
}
