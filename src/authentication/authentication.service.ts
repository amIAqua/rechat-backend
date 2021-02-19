import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginUserCredentialsDTO } from './dto/authentication.dto'
import bcrypt from 'bcrypt'
import { compareUserPassword } from './utils/hashingPassword.utils.'

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

  async login(loginCredentalsDto: LoginUserCredentialsDTO): Promise<string> {
    const candidate = await this.usersService.findUser(loginCredentalsDto.name)

    const comparedPassword = await compareUserPassword(
      candidate.password,
      loginCredentalsDto.password,
    )

    if (!candidate || !comparedPassword) {
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
      return false
    }
  }
}
