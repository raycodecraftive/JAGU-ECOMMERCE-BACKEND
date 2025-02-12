// User Profile & Address Management Impelementation in NestJs
// We will be implementing UserProfileManagement ( View, Update Profile)
// Address Management (Add,Update,Delete Addresses)

import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { JaguAuthGuard } from "src/guards/auth.guard";

@Controller('user-profile')
@UseGuards(JaguAuthGuard)
export class UserProfileController {
    constructor(private userProfileService: UserProfileService) {

    }

    @Get()
    // localhost:3000/user-profile
    async getUserProfile(req) {
        const userId = req.user;
        return await this.userProfileService.getUserProfile(userId);
    }



}