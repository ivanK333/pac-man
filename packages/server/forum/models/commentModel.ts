import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import MessageModel from './messageModel';

@Table({
  tableName: 'comments',
})
class CommentModel extends Model<CommentModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public override id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  text: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_login: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_avatar: string;

  @ForeignKey(() => MessageModel)
  @Column(DataType.UUID)
  message_id: MessageModel;
}

export default CommentModel;
