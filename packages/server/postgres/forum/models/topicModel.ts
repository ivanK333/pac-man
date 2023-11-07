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

import MessageModel from './messageModel';
import UserModel from '../../user/models/userModel';

@Table({
  tableName: 'topics',
})
class TopicModel extends Model<TopicModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public override id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  text: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  messages_count: number;

  @HasMany(() => MessageModel, {
    foreignKey: 'topic_id',
    as: 'messages',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  messages: MessageModel[];

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @ForeignKey(() => UserModel)
  @Column
  owner_id: string;
}

export default TopicModel;
