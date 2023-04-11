import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserProfile } from './user-profile.schema';
import { UserProfileService } from './user-profile.service';

@Controller('user-profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  async create(@Body() userProfile: UserProfile): Promise<UserProfile> {
    return this.userProfileService.create(
      userProfile.address,
      userProfile.role,
    );
  }

  @Get(':address')
  async findByAddress(@Param('address') address: string): Promise<UserProfile> {
    return this.userProfileService.findByAddress(address);
  }

  @Put(':address')
  async update(
    @Param('address') address: string,
    role: string,
  ): Promise<UserProfile> {
    return this.userProfileService.update(address, role);
  }
}
