import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginUserCredentialsDTO } from './dto/authentication.dto'
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

  async login(loginCredentalsDto: LoginUserCredentialsDTO): Promise<any> {
    const candidate = await this.usersService.findUserByName(
      loginCredentalsDto.name,
    )

    const comparedPassword = await compareUserPassword(
      candidate.password,
      loginCredentalsDto.password,
    )

    if (!candidate || !comparedPassword) {
      return null
    }

    // creating jwt token
    const token = this.jwtService.sign(
      {
        user: {
          name: candidate.name,
          password: candidate.password,
          dialogs: candidate.dialogs,
          _id: candidate._id,
        },
      },
      { expiresIn: '30m' },
    )

    const avatar_url = candidate.avatarURL ?? null

    return {
      name: candidate.name,
      dialogs: candidate.dialogs,
      _id: candidate._id,
      token,
      avatarURL: avatar_url,
    }
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
