import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JaguAuthGuard } from 'src/guards/auth.guard';

//@nestjs/common provides core NestJS Decorators and Utilitties
//ReviewsService: Service for handling business logic related to reviews
//CreateReviewDto and UpdateReviewDto: DTOs to validate incoming data


@UseGuards(JaguAuthGuard)
@Controller('reviews')
export class ReviewsController {
    //@Controller('reviews'): Defines this as a controller with the base route /reviews.
//For example, POST /reviews will trigger the create method.

    constructor(private readonly reviewsService : ReviewsService) {}
//This injects ReviewsService, allowing the controller to call its methods.

    
    @Post()
    async create(@Req() req, @Body() dto: CreateReviewDto) {
        return this.reviewsService.createReview(req.user.id, dto);
    }

    
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
        return this.reviewsService.updateReview(id, dto);
    }


    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.reviewsService.deleteReview(id);
    }
}
