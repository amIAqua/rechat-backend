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
      dialogs: userDto.dialogs,
      avatar: null,
    }

    const newUser = new this.userModel(user)
    return newUser.save()
  }

  // remove user when account is deleted
  async removeUser(_id: string) {
    return this.userModel.findByIdAndDelete(_id)
  }

  // get user dialogs
  async getUserDialogs(_id: string) {
    const user = await this.userModel.findById({ _id })

    if (!user) {
      return null
    }

    return user.dialogs
  }

  async uploadUserAvatar(_id: string, avatarURL: any) {
    const candidate = await this.userModel.findById({ _id })

    if (!candidate) {
      return
    }

    candidate.avatarURL = avatarURL
    return candidate.save()
  }

  async getUserAvatar(_id: string) {
    const candidate = await this.userModel.findById({ _id })

    if (!candidate) {
      return
    }

    return candidate.avatarURL
  }
}
