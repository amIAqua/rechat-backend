import { Body, Controller, Post, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':_id/dialogs')
  getDialogs(@Param() params: any) {
    const { _id } = params

    return this.userService.getUserDialogs(_id)
  }

  @Post('add')
  add(@Body() createUserDto: CreateUserDTO) {
    this.userService.createNewUser(createUserDto)
  }
}
