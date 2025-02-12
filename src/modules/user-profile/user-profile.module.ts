import { Module } from '@nestjs/common';

import { PrismaModule } from '../../services/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';


@Module({
    imports: [PrismaModule], // Import PrismaModule
    providers: [UserProfileService],
    exports: [UserProfileService],
    controllers: [UserProfileController]
})
export class UserProfileModule {}
