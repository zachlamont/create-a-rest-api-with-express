import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

console.log("Hello Node.js project.");

console.log(process.env.MY_SECRET);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);


