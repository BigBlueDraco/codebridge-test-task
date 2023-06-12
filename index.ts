import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { urlencoded } from "body-parser";

import dogsRouter from "./src/routes/dogs/dogs.route";
import pingRouter from "./src/routes/ping/ping.route";
import connection from "./src/config/db.config";
dotenv.config();

const app: Express = express();
const port: string | number = process.env.SERVER_PORT || 8080;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/ping", pingRouter);
app.use("/dogs", dogsRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

connection
  .sync()
  .then(() => {
    console.log("DB synced successfuly");
  })
  .catch((err) => {
    console.error("Error " + err);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
