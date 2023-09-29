const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIO(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET"] },
});

let UsersList = [
  {
    name: "Tarek",
    age: 25,
    active: true,
    salary: 399,
    skill: ["C#", "JS"],
  },
  {
    name: "Ahmed",
    age: 52,
    active: true,
    salary: 299,
    skill: ["C++", "TS", "Css"],
  },
  {
    name: "Maya",
    age: 20,
    active: true,
    salary: 369,
    skill: ["Java", "Oracle"],
  },
  {
    name: "Lana",
    age: 18,
    active: false,
    salary: 145,
    skill: ["laravel", "Html"],
  },
  {
    name: "Yana",
    age: 26,
    active: true,
    salary: 179,
    skill: ["Rust", "JS"],
  },
  {
    name: "Rami",
    age: 17,
    active: false,
    salary: 312,
    skill: [],
  },
  {
    name: "Naya",
    age: 23,
    active: true,
    salary: 150,
    skill: ["Java", "JS"],
  },
  {
    name: "mouaz",
    age: 16,
    active: false,
    salary: 173,
    skill: ["C", "Go"],
  },
];

app.get("/Users", (req, res) => {
  res.json(UsersList);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  setInterval(() => {
    socket.emit("messageQueue", "hello");
  }, 5000);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
