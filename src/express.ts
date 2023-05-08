import "dotenv/config";
import express from "express";
import httpError from "http-errors";

const app = express();

app.use((req, res, next) => {
  const user_id = "10";
  (req as any).user_id = user_id;
  next();
});

app.get("/", (req, res, next) => {
  res.send((req as any).user_id);
});

app.listen(process.env.PORT, () =>
  console.log(`Connected to ${process.env.PORT}`)
);
