import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(req.user, dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
    @Req() req,
  ) {
    return this.reviewsService.updateReview(id, dto, req.user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    return this.reviewsService.deleteReview(id, req.user);
  }
}
