import { Model, Optional, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/connection";


interface TodoAttr {
  id?: number,
  activity_group_id?: number | string,
  title?: string,
  is_active?: number | boolean | string,
  priority?: string,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date | null,
}

export interface TodoInput extends Optional<TodoAttr, 'id'> { };
export interface TodoOutput extends Required<TodoAttr> { };

class Todo extends Model<TodoAttr, TodoInput> implements TodoAttr {
  public id!: number;
  public activity_group_id!: number | string;
  public title!: string;
  public is_active!: number | boolean | string;
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
    type: DataTypes.INTEGER,

  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  is_active: {
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN
  },
  priority: {
    allowNull: false,
    defaultValue: "very-high",
    type: DataTypes.STRING
  },
}, {
  tableName: "todos",
  timestamps: true,
  paranoid: true,
  sequelize: sequelizeConnection,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
  indexes: [
    {
      unique: false,
      fields: ['activity_group_id']
    }
  ]
});

export default Todo