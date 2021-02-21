import { Injectable } from '@nestjs/common'
import { Dialog } from 'src/users/dto/user.interfaces'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class DialogsService {
  constructor(readonly userService: UsersService) {}

  async findUserForChat(currentUser_id: string, companionName: string) {
    const currentUser = await this.userService.findUserById(currentUser_id)

    const dialogCompanion = await this.userService.findUserByName(companionName)

    if (!dialogCompanion || !currentUser) {
      return null
    }

    const arr: Dialog[] = []

    const newDialog: any = {
      companion: dialogCompanion.name,
      dialogId: Date.now(),
      messages: [],
    }

    // TODO: REFACTOR AND TYPES
    arr.push(newDialog)
    // @ts-ignore
    currentUser.dialogs = arr

    return currentUser.save()
  }
}
