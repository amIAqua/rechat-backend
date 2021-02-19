import { IsNotEmpty } from 'class-validator'

export class LoginUserCredentialsDTO {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly password: string
}
