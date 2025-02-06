import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
