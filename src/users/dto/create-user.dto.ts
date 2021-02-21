import { IsNotEmpty } from 'class-validator'

interface Dialog {
  companion: string
  dialogId: string
  messages: Array<any>
}

export class CreateUserDTO {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly password: string

  readonly dialogs: Array<Dialog> | []
}
