import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('add')
  add(@Body() createUserDto: CreateUserDTO) {
    this.userService.createNewUser(createUserDto)
  }
}
