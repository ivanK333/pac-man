import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import MessageModel from '../../forum/models/messageModel';
import TopicModel from '../../forum/models/topicModel';
import CommentModel from '../../forum/models/commentModel';
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

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  light_theme: boolean;

  // relations
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
