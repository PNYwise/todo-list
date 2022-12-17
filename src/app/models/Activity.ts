import { Model, Optional, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/connection";


interface ActivityAttr {
  id?: number,
  email?: string,
  title?: string,

  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date,
}

export interface ActivityInput extends Optional<ActivityAttr, 'id'> { };
export interface ActivityOutput extends Required<ActivityAttr> { };

class Activity extends Model<ActivityAttr, ActivityInput> implements ActivityAttr {
  public id!: number;
  public email!: string;
  public title!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
};

Activity.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
}, {
  tableName: "activities",
  timestamps: true,
  paranoid: true,
  sequelize: sequelizeConnection,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at"
});

export default Activity