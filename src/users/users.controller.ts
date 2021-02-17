import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Post('add')
  createNewUser(@Body() userDto: CreateUserDTO) {
    return this.userService.createNewUser(userDto)
  }

  @Delete('remove/:_id')
  removeUser(@Param() _id: string) {
    return this.userService.removeUser(_id)
  }
}
