import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(options) {
    return await this.userModel.create(options);
  }

  async findOne(options) {
    return await this.userModel.findOne(options);
  }

  async findOneAndSelect(options) {
    return await this.userModel.findOne(options).select('+password');
  }

  async update(_id: number, options) {
    return await this.userModel.updateOne({ _id }, options);
  }
}
