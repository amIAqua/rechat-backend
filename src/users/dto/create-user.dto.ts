import { IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly password: string
}
