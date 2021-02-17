import { Module } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module'

@Module({
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  imports: [
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    UsersModule,
  ],
})
export class AuthenticationModule {}
