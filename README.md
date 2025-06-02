# Wordle‑Style Game (Node 18 + Express 5)

A lightweight **Wordle clone**: vanilla HTML/CSS/JS on the front end and a tiny REST API on Node 18 + Express 5 on the back end.

---

## ✨ Features

* **5 × 6 grid** with flip animation and the familiar green / yellow / gray colours.  
* **Keyboard controls** (letters, Backspace, Enter).  
* **Two REST endpoints**

  | Method | Route | Description |
  | ------ | ----- | ----------- |
  | `GET /word‑of‑the‑day` | Returns `{ word, puzzleNumber }`. |
  | `POST /validate‑word`  | Returns `{ validWord: true/false }` for any five‑letter attempt. |

* **Zero front‑end frameworks** – pure JS, CSS & HTML.

---

## 📁 Project layout

```
root/
├─ index.html
├─ style.css
├─ logic.js
├─ Dockerfile
├─ docker-compose.yml
└─ backend/
   ├─ server.js
   ├─ words.js
   ├─ package.json
   └─ package-lock.json
```

---

## 🚀 Quick start

### 1 – Run without Docker (local)

```bash
cd backend
npm ci        # reproducible install
npm start     # runs node server.js
# open http://localhost:3000
```

The server listens on `process.env.PORT || 3000`.

### 2 – Run with Docker Compose (recommended)

`docker compose` automatically **builds** the image the first time it starts, so no separate `docker build` is required.

```bash
# start container (builds on first run) and follow logs
docker compose up           # add -d to run in the background

#   edit any file  → Node 18 restarts automatically (--watch)

# stop and remove the container + network
docker compose down
```

Hot reload works because `docker-compose.yml`:

* mounts the project into `/app` (`volumes`), and  
* launches `node --watch backend/server.js` (`command`).

---

## ⚙️ npm scripts

| Script        | Purpose                         |
| ------------- | ------------------------------- |
| `npm start`   | Production run (`node server.js`) |

---

## 📑 Licence

Released under the **ISC** licence (see `package.json`).
