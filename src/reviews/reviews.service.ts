import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(private prisma : PrismaService) {}

    async createReview(userId: string, dto: CreateReviewDto) {
        return this.prisma.review.create({
            data: {
                rating: dto.rating,
                comment: dto.comment,
                productId: dto.productId,
                userId: userId,
            }
        });
    }

    async getReviewsForProduct(productId: string) {
        return this.prisma.review.findMany({
            where: { productId },
            include: { user: true },
        });
    }

    async updateReview(reviewId : string, dto: UpdateReviewDto) {
        return this.prisma.review.update({
            where: { id: reviewId },
            data: { comment: dto.comment, rating: dto.rating },
        });
    }

    async deleteReview(reviewId: string) {
        return this.prisma.review.delete({ where: { id: reviewId } });
    }
}
