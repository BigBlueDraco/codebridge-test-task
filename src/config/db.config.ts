import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Dogs } from "../models/dogs.model";
dotenv.config();
const dbConfig = {
  HOST: process.env.MYSQL_HOST || "",
  USER: process.env.MYSQL_USER || "",
  PASSWORD: process.env.MYSQL_PASSWORD || "",
  DB: process.env.MYSQL_DATABASE || "",
};

const { DB, USER, PASSWORD, HOST } = dbConfig;
const connection = new Sequelize({
  host: HOST,
  username: USER,
  password: PASSWORD,
  database: DB,
  dialect: "mysql",
  // models: [Dogs],
});

export default connection;
