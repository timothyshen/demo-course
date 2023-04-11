import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from './user-profile.schema';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
  ) {}

  async create(address: string, role: string) {
    const userProfile = new this.userProfileModel({ address, role });
    await userProfile.save();
    return userProfile;
  }

  async findByAddress(address: string): Promise<UserProfile> {
    const UserProfile = await this.userProfileModel.findOne({ address });
    return UserProfile;
  }

  async update(address: string, role: string): Promise<UserProfile> {
    const userProfile = await this.userProfileModel.findOneAndUpdate(
      { address },
      { role },
    );
    return userProfile;
  }
}
