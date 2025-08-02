const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock database
const users = [
  { id: 1, name: "Alex Johnson", referralCode: "alex2025", src:"https://avatar.iran.liara.run/public/9", donations: 1250 },
  { id: 2, name: "Sam Wilson", referralCode: "sam2025", src:"https://avatar.iran.liara.run/public/18", donations: 850 },
];


// API Endpoints
app.get("/api/dashboard", (req, res) => {
  res.json(users); // Return first user data
});

app.get("/api/leaderboard", (req, res) => {
  res.json([
    {
      name: "Taylor Swift",
      amount: 3200,
      src: "https://avatar.iran.liara.run/public/26",
    },
    {
      name: "Alex Johnson",
      amount: 1250,
      src: "https://avatar.iran.liara.run/public/32",
    },
    {
      name: "Jordan Lee",
      amount: 950,
      src: "https://avatar.iran.liara.run/public/45",
    },
    {
      name: "Sam Wilson",
      amount: 850,
      src: "https://avatar.iran.liara.run/public/22",
    },
    {
      name: "Casey Kim",
      amount: 600,
      src: "https://avatar.iran.liara.run/public/11",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
