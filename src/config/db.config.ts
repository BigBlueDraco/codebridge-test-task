import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const dbConfig = {
  HOST: process.env.MYSQL_HOST || "",
  USER: process.env.MYSQL_USER || "",
  PASSWORD: process.env.MYSQL_PASSWORD || "",
  DB: process.env.MYSQL_DATABASE || "",
};

const { DB, USER, PASSWORD, HOST } = dbConfig;
const connection = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

export default connection;
