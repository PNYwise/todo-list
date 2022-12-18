import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

const dbName = process.env.MYSQL_DBNAME as string
const dbHost = process.env.MYSQL_HOST
const dbUsername = process.env.MYSQL_USER as string
const dbPassword = process.env.MYSQL_PASSWORD
const dbPort = process.env.MYSQL_PORT as any
const dbDialect = "mysql"

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
     host: dbHost,
     port: dbPort,
     dialect: dbDialect,
     pool: {
          max: 50,
          min: 0,
          acquire: 30000,
          idle: 10000
     }
})
export default sequelizeConnection

