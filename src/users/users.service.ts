import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDTO } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'
import { hashUserPassword } from 'src/authentication/utils/hashingPassword.utils.'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // find user in database for login
  async findUser(name: string) {
    return this.userModel.findOne({ name })
  }

  // create new user in database after register
  async createNewUser(userDto: CreateUserDTO): Promise<User> {
    const hashedPassword = await hashUserPassword(userDto.password)

    const user = {
      ...userDto,
      password: hashedPassword,
    }

    const newUser = new this.userModel(user)
    return newUser.save()
  }

  // remove user when account is deleted
  async removeUser(_id: string) {
    return this.userModel.findByIdAndDelete(_id)
  }
}
