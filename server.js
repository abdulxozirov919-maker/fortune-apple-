const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let gameHistory = [];

app.get("/", (req, res) => {
  res.send("Fortune Apple Server Ishlayapti 🚀");
});

// register
app.post("/register", (req, res) => {
  const { username } = req.body;
  const newUser = {
    id: Date.now(),
    username,
    balance: 1000,
    referral: null
  };
  users.push(newUser);
  res.json(newUser);
});

// get users
app.get("/users", (req, res) => {
  res.json(users);
});

// admin balance update
app.post("/admin/update-balance", (req, res) => {
  const { userId, amount } = req.body;
  const user = users.find(u => u.id == userId);
  if (!user) return res.status(404).json({ message: "User topilmadi" });

  user.balance += amount;
  res.json(user);
});

// random game result
app.get("/game", (req, res) => {
  const random = (Math.random() * 5 + 1).toFixed(2);
  gameHistory.push(random);
  res.json({ multiplier: random });
});

app.listen(3000, () => {
  console.log("Server 3000 portda ishlayapti");
});
