import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import CommentModel from './commentModel';
import TopicModel from './topicModel';
import UserModel from './userModel';

@Table({
  tableName: 'messages',
})
class MessageModel extends Model<MessageModel> {
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
  owner_login: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_avatar: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  comments_count: number;

  @HasMany(() => CommentModel, {
    foreignKey: 'message_id',
    as: 'comments',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  comments: CommentModel[];

  @ForeignKey(() => TopicModel)
  @Column(DataType.UUID)
  topic_id: TopicModel;

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @ForeignKey(() => UserModel)
  @Column
  owner_id: string;
}

export default MessageModel;
