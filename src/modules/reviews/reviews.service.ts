import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: string, dto: CreateReviewDto) {
    let product = await this.prisma.product.findFirst({
      where: {
        id: dto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('No product found for this ID');
    }

    //  check if an actual order is exist

    let order = await this.prisma.orderItem.findFirst({
      where: {
        productId: dto.productId,
        order: {
          status: OrderStatus.delivered,
        },
      },
      include: {
        order: true,
      },
    });

    if (!order) {
      throw new NotFoundException('No order found for this product');
    }

    return this.prisma.review.create({
      data: {
        rating: dto.rating,
        comment: dto.comment,
        productId: dto.productId,
        userId: userId,
      },
    });
  }

  async getReviewsForProduct(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      include: { user: true },
    });
  }

  async updateReview(reviewId: string, dto: UpdateReviewDto , userId: string) {
    return this.prisma.review.update({
      where: { id: reviewId,
userId : userId

       },
      data: { comment: dto.comment, rating: dto.rating },
    });
  }

  async deleteReview(reviewId: string , userID: string) {
    return this.prisma.review.delete({ where: { id: reviewId, userId : userID } });
  }
}
