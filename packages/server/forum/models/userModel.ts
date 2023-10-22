import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import MessageModel from './messageModel';
import TopicModel from './topicModel';
import CommentModel from './commentModel';
@Table({
  tableName: 'users',
  timestamps: false,
})
class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Column(DataType.STRING)
  override id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  login: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  avatar: string;

  @HasMany(() => TopicModel, {
    onUpdate: 'CASCADE',
    hooks: true,
  })
  topic: TopicModel[];

  @HasMany(() => MessageModel, {
    onUpdate: 'CASCADE',
    hooks: true,
  })
  message: MessageModel[];

  @HasMany(() => CommentModel, {
    onUpdate: 'CASCADE',
    hooks: true,
  })
  comment: CommentModel[];
}

export default UserModel;
