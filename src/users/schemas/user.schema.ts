import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Buffer } from 'buffer'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  name: string

  @Prop()
  password: string

  @Prop({ type: Array })
  dialogs: []

  @Prop({ required: false })
  avatarURL: string
}

export const UserSchema = SchemaFactory.createForClass(User)
