import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginUserDTO } from './dto/authentication.dto'

@Injectable()
export class AuthenticationService {
  constructor(
    readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDTO) {
    const candidate = await this.usersService.findUser(loginDto.name)

    if (!candidate) {
      return
    }

    if (candidate.password !== loginDto.password) {
      return null
    }

    // creating jwt token
    return this.jwtService.sign({ candidate }, { expiresIn: '1h' })
  }
}
