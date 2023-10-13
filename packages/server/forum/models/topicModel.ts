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

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_login: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  owner_avatar: string;

  @HasMany(() => MessageModel, {
    foreignKey: 'topic_id',
    as: 'messages',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  message: MessageModel[];
}

export default TopicModel;
