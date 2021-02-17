import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDTO } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers() {
    return this.userModel.find().exec()
  }

  async createNewUser(userDto: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(userDto)
    return newUser.save()
  }

  async removeUser(_id: string) {
    return this.userModel.findByIdAndDelete(_id)
  }
}
