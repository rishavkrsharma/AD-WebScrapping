import express from "express";
import cors from "cors";
import appRoute from "./routers/appRouter.js";
import bodyParser from "body-parser";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

// Setup Router
app.use("/api/v1", appRoute);

app.get("/", (req, res) => {
  res.send("server is working");
});
