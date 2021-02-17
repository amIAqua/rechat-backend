import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { LoginUserDTO } from './dto/authentication.dto'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDTO) {
    return this.authService.login(loginUserDto)
  }

  @Get('logout')
  logout() {
    // service
  }
}
