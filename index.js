const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");

let counter = users.length;

app.use(bodyParser.json());

/* BEGIN - create routes here */

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/1", (req, res) => {
  res.json(users[0]);
});

app.get("/users/:userId", (req, res) => {
  const user = users.find((u) => u._id === parseInt(req.params.userId));
  res.json(user);
});

app.post("/users", (req, res) => {
  counter++;
  users.push({
    _id: counter,
    name: "David Hernadez",
    occupation: "Software Engineer",
    avatar: "https://i.imgur.com/7VQ2cQw.jpg",
  });
  res.json(users[users.length - 1]);
});

app.put("/users/1", (req, res) => {
  (users[0].name = "David Hernadez"),
    (users[0].occupation = "Software Engineer"),
    res.json(users[0]);
});

app.put("/users/:userId", (req, res) => {
  const user = users.find((u) => u._id === parseInt(req.params.userId));
  (user.occupation = "Software Engineer"), res.json(user);
});

app.delete("/users/1", (req, res) => {
  users.splice(0, 1);
  res.send("User deleted");
});

app.delete("/users/:userId", (req, res) => {
  const user = users.find((u) => u._id === parseInt(req.params.userId));
  user.isActive = false;
  res.send("deleted");
});

app.post("/users", (req, res) => {
  const newUser = {};
  newUser._id = counter;
  newUser.name = req.body.name;
  newUser.occupation = req.body.occupation;
  newUser.avatar = req.body.avatar;
  users.push(newUser);
  res.json(newUser);
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
