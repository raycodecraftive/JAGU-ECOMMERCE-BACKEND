// User Profile & Address Management Impelementation in NestJs
// We will be implementing UserProfileManagement ( View, Update Profile)
// Address Management (Add,Update,Delete Addresses)

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { JaguAuthGuard } from 'src/guards/auth.guard';

@Controller('user-profile')
@UseGuards(JaguAuthGuard)
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Get('me')
  // localhost:3000/user-profile
  async getUserProfile(@Req() req) {
    return await this.userProfileService.getUserProfile(req.user);
  }
}
