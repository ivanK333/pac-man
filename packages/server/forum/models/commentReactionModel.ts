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

import CommentModel from './commentModel';

@Table({
  tableName: 'commentReactions',
})
class CommentReactionModel extends Model<CommentReactionModel> {
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

  @ForeignKey(() => CommentModel)
  @Column(DataType.INTEGER)
  comment_id: number;
}

export default CommentReactionModel;
