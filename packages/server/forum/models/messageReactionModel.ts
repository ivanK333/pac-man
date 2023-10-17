import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

import MessageModel from './messageModel';

@Table({
  tableName: 'messageReactions',
})
class MessageReactionModel extends Model<MessageReactionModel> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public override id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  reaction_type: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_id: string;

  @ForeignKey(() => MessageModel)
  @Column(DataType.INTEGER)
  message_id: number;
}

export default MessageReactionModel;
