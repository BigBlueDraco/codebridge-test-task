import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dogsRouter from "./src/routes/dogs/dogs.route";
import pingRouter from "./src/routes/ping/ping.route";
dotenv.config();

const app: Express = express();
const port: string | number = process.env.SERVER_PORT || 8080;

app.use(cors());

app.use("/ping", pingRouter);
app.use("/dogs", dogsRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
