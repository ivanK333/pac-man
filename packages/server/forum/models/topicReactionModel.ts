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

import TopicModel from './topicModel';

@Table({
  tableName: 'topicReactions',
})
class TopicReactionModel extends Model<TopicReactionModel> {
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

  @ForeignKey(() => TopicModel)
  @Column(DataType.INTEGER)
  topic_id: number;
}

export default TopicReactionModel;
