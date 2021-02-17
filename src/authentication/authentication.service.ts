import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginUserDTO } from './dto/authentication.dto'

export interface IDecodedUser {
  _id: string
  name: string
  password: string
  iat: number
  exp: number
}

@Injectable()
export class AuthenticationService {
  constructor(
    readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDTO): Promise<string> {
    const candidate = await this.usersService.findUser(loginDto.name)

    if (!candidate) {
      return
    }

    if (candidate.password !== loginDto.password) {
      return null
    }

    // creating jwt token
    return this.jwtService.sign(
      {
        name: candidate.name,
        password: candidate.password,
        _id: candidate._id,
      },
      { expiresIn: '2m' },
    )
  }

  async verifyUserToken(token: string): Promise<any> {
    try {
      const decodedUserFromToken = await this.jwtService.verify(token)
      return decodedUserFromToken
    } catch (error) {
      return 'expired'
    }
  }
}
