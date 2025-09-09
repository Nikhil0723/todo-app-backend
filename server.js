import express from "express";
import cors from "cors";
import { connectDB } from "./mongoDB.js";
import dotenv from "dotenv";
import taskroute from "./routes/task.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
};

const PORT = process.env.PORT || 8080;
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", taskroute);
app.get("/", (req, res) => {
  res.send("Task manager is running");
  console.log("running");
});

connectDB().then(
  app.listen(PORT, () => {
    console.log("server is running");
  })
);
