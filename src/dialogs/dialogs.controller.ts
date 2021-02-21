import { Controller, Post, Body } from '@nestjs/common'
import { DialogsService } from './dialogs.service'
import { CreateDialogDTO } from './dto/create-dialog.dto'

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Post('dialog_start')
  createDialog(@Body() createDialogDto: CreateDialogDTO) {
    this.dialogsService.findUserForChat(
      createDialogDto.currentUser_id,
      createDialogDto.companionName,
    )
  }
}
