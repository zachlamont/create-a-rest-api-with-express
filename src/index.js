import "dotenv/config";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log("Hello Node.js project.");

console.log(process.env.MY_SECRET);

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  2: {
    id: "2",
    text: "By World",
    userId: "2",
  },
};

//app.get("/users", (req, res) => {
//return res.send("GET HTTP method on user resource");
//});

app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
  });

app.post("/users", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

app.use((req, res, next) => {
  req.me = users[1];
  next();
});

app.post("/messages", (req, res) => {
  const id = uuidv4(); //generate a unique identifier for the message
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});

app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;

  messages = otherMessages;

  return res.send(message);
});



  
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

/* 
Start your Express server on the command line (npm run start), if it isn't running already, and execute four cURL commands in another command line window. You should see the following output for the commands:

curl http://localhost:3000
-> Received a GET HTTP method

curl -X POST http://localhost:3000
-> Received a POST HTTP method

curl -X PUT http://localhost:3000
-> Received a PUT HTTP method

curl -X DELETE http://localhost:3000
-> Received a DELETE HTTP method

By default cURL will use a HTTP GET method. However, you can specify the HTTP method with the -X flag (or --request flag).
*/
