import "dotenv/config";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import models from "./models";
import routes from "./routes";

const app = express();

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log("Hello Node.js project.");

console.log(process.env.MY_SECRET);

app.post("/users", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

