import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { LoginUserCredentialsDTO } from './dto/authentication.dto'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  login(@Body() loginUserCredentialsDto: LoginUserCredentialsDTO) {
    return this.authService.login(loginUserCredentialsDto)
  }

  @Post('verify')
  verifyUserToken(@Body() body: { token: string }) {
    return this.authService.verifyUserToken(body.token)
  }

  @Get('logout')
  logout() {
    // service
  }
}
