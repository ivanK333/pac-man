import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'themes',
})
class ThemeModel extends Model<ThemeModel> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  user_id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  light_theme: boolean;
}

export default ThemeModel;
