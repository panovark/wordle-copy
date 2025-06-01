# Wordle‑Clone — front‑end + back‑end

A minimalist Wordle‑style guessing game built with **vanilla HTML/CSS/JS** on the front‑end and a tiny **Node 18 ＋ Express 5** REST API.

---

## ✨ Features

* **5 × 6 grid** with the same flip / colour animations as the original game
* Keyboard support
* **Two‑route API**:

  * `GET /word-of-the-day` – returns the daily word and puzzle number
  * `POST /validate-word` – verifies a 5‑letter guess
* Zero client‑side libraries; server uses only **express • body‑parser**

---

## 📁 Project layout

```
wordle/
├─ index.html          # UI
├─ style.css           # styles
├─ logic.js            # client logic (fetches the API)
├─ README.md           # this file
└─ backend/
    ├─ server.js       # Express entry point – also serves the static UI
    ├─ words.js        # 5‑letter dictionary
    ├─ package.json    # deps & scripts
    └─ …
```

---

## 🔧 Prerequisites

* **Node.js ≥ 18** (npm included)
* Any modern browser

---

## 🚀 Quick start (local)

```bash
# 1. install deps & launch the server
cd backend
npm ci            # reproducible install
npm start         # runs "node server.js"
# → http://localhost:3000

# 2. open the game
open http://localhost:3000     # macOS
start http://localhost:3000    # Windows
```

`server.js` binds the port like this:

```js
const PORT = process.env.PORT || 3000;
```

Set a custom port if you need:

```bash
PORT=4000 npm start   # Linux/macOS
set PORT=4000&&npm start   # Windows CMD
```

Because the **front‑end now calls the API using *relative* paths** (`/word-of-the-day`, `/validate-word`), you don’t need to change anything when you move the app to another domain or port.

## 🛣️ API reference

* **/word-of-the-day** returns the same 5‑letter word to everyone for 24 h (based on epoch offset).
* **/validate-word** checks length == 5 and dictionary membership; the front‑end calculates tile colours locally.
