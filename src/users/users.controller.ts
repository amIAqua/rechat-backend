import { Body, Controller, Post, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':_id/dialogs')
  getDialogs(@Param() params: { _id: string }) {
    const { _id } = params

    return this.userService.getUserDialogs(_id)
  }

  @Post('add')
  add(@Body() createUserDto: CreateUserDTO) {
    this.userService.createNewUser(createUserDto)
  }

  @Post(':_id/setAvatar')
  setUserAvatar(@Param() params: { _id: string }, @Body() body) {
    const { avatar_url } = body
    this.userService.uploadUserAvatar(params._id, avatar_url)
  }

  @Get(':_id/avatar')
  getUserAvatar(@Param() params: { _id: string }) {
    const { _id } = params

    return this.userService.getUserAvatar(_id)
  }
}
