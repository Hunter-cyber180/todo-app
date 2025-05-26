import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import todoController from "./todos/todoController";
import dotenv from "dotenv";
import cors from "cors";
import clientError from "./errors/errorInterface";
const app = express();
dotenv.config();

app.use(cors());

app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.MONGO_DB_URI}`, {
    autoIndex: true,
  })
  .then(() => console.log("database connected..."))
  .catch((error) => console.log("error connecting database: ", error));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "welcome to main page!" });
});

app.use("/todos", todoController);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "page not found!" });
});

app.use(
  (error: clientError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;

    res.status(statusCode).json({
      success: false,
      error: {
        message: `Error: ${error.message || "Internal Server Error!"}`,
      },
    });
  }
);

const port: number = parseInt(process.env.PORT!) || 3000;

app.listen(port, "127.0.0.1", () =>
  console.log(`server running on localhost:${port}...`)
);
