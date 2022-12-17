import { Model, Optional, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/connection";


interface TodoAttr {
  id?: number,
  activity_group_id?: string,
  title?: string,
  is_active?: string,
  priority?: string,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date,
}

export interface TodoInput extends Optional<TodoAttr, 'id'> { };
export interface TodoOutput extends Required<TodoAttr> { };

class Todo extends Model<TodoAttr, TodoInput> implements TodoAttr {
  public id!: number;
  public activity_group_id!: string;
  public title!: string;
  public is_active!: string;
  public priority!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public deleted_at!: Date;
};

Todo.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  activity_group_id: {
    allowNull: false,
    type: DataTypes.STRING
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  is_active: {
    allowNull: false,
    type: DataTypes.STRING
  },
  priority: {
    allowNull: false,
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  paranoid: true,
  sequelize: sequelizeConnection,
  underscored: true
});

export default Todo