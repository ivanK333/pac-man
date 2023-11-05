import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import MessageModel from './messageModel';
import UserModel from './userModel';
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

  @ForeignKey(() => MessageModel)
  @Column(DataType.UUID)
  message_id: MessageModel;

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @ForeignKey(() => UserModel)
  @Column
  owner_id: string;
}

export default CommentModel;
