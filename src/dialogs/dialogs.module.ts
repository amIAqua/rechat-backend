import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { DialogsController } from './dialogs.controller'
import { DialogsService } from './dialogs.service'

@Module({
  imports: [UsersModule],
  controllers: [DialogsController],
  providers: [DialogsService],
  exports: [DialogsService],
})
export class DialogsModule {}
