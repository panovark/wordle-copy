const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const words   = require("./words.js");

const app = express();     // server variable

app.use(bodyParser.json({ type: '*/*' }));   // JSON unpacking

// word choosing
const EPOCH = new Date("2021-01-01T00:00:00Z");   // beginning date

function getPuzzleNumber() {
  const msPerDay     = 86_400_000;
  const diffInDays   = Math.floor((Date.now() - EPOCH) / msPerDay);
  return diffInDays;
}

function getTodayWord() {
  const idx = getPuzzleNumber() % words.length;          
  return words[idx];  // lower-case
}

// GET /word-of-the-day
app.get("/word-of-the-day", (_, res) => {
  res.json({
    word:         getTodayWord(),    // "penne"
    puzzleNumber: getPuzzleNumber()  // 1146
  });
});

// POST /validate-word
app.post("/validate-word", (req, res) => {
  const guess = (req.body.word || "").toLowerCase();

  // conditions for a word
  const validWord = guess.length === 5 && words.includes(guess);

  res.json({ word: guess, validWord });   // example {"word":"hell", "validWord":false}
});

app.use(express.static(path.join(__dirname, '..')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// launch
const PORT = process.env.PORT || 3000;       
app.listen(PORT, () =>
  console.log(`✅  API is listening to http://localhost:${PORT}`)
);
