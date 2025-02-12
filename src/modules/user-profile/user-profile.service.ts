import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";

@Injectable()
export class UserProfileService {
    constructor(private prisma: PrismaService) {}

    // Get User Profile
    async getUserProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId},
            select: { id : true, firstName : true, lastName: true, email : true, phoneNumber : true }
        });

        if(!user) throw new NotFoundException('User not found');
        return user;
    }
    // Update User Profile
    async updateUserProfile(userId: string, data: { firstName?: string; lastName?: string; phoneNumber?: string }) {
        return await this.prisma.user.update({
            where: { id: userId },
            data,
        });
    }
}