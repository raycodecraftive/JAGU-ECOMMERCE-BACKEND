import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { AuthService } from './modules/auth/auth.service';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { ProductsModule } from './modules/products/products.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { CartModule } from './modules/cart/cart.module';


@Module({
  imports: [AuthModule, PrismaModule , UserProfileModule, ProductsModule, ReviewsModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
