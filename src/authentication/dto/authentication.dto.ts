import { IsNotEmpty } from 'class-validator'

export class LoginUserDTO {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly password: string
}
