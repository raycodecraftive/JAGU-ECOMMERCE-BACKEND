import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [PrismaModule, JwtModule.register({
        global:true, secret: process.env.JWT_SECRET,signOptions:{
            expiresIn: process.env.JWT_EXPIRY
        }
    })], // Import PrismaModule
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
