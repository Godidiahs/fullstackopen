# Part 3 — Programming a server with NodeJS and Express

Full Stack Open, Part 3 (exercises 3.1–3.22).

## App

`phonebook/` — the phonebook backend. The frontend is the Part 2
phonebook app; this backend replaces its JSON server with a real
Express + MongoDB API and can serve the frontend's production
build from `dist/`.

## Exercises covered

- 3.1–3.8 — Node/Express server, `GET /api/persons`, `GET /api/persons/:id`,
  `POST /api/persons`, `DELETE /api/persons/:id`, `/info`, request logging
  with Morgan (including the request body), unknown-endpoint and error handling.
- 3.9–3.11 — the backend serves the frontend build from `dist/` and
  the frontend is configured to use it in production.
- 3.12–3.14 — MongoDB Atlas, the `mongo.js` command-line helper and the
  `Person` Mongoose model (`models/person.js`), with data fetched from
  the database instead of a hard-coded list.
- 3.15–3.17 — deleting and updating persons in the database (update
  is in `index.js`, `PUT /api/persons/:id`).
- 3.18 — error handling: the frontend in Part 2 already shows the
  backend's error when a person was deleted from the server.
- 3.19–3.20 — validation: name at least 3 characters, number at least
  8 characters and matching `NN-NNNNN…` or `NNN-NNNNN…` (`/^\d{2,3}-\d+$/`);
  validation runs on create and on update, and validation errors are
  returned with status 400.
- 3.21 — deployment: the port comes from `process.env.PORT` and the
  connection string from `MONGODB_URI` in `.env` (see `.env.example`);
  no secret is committed.
- 3.22 — linting: `npm run lint` (ESLint, `eslint.config.js`).

## API

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/persons` | List all persons |
| GET | `/api/persons/:id` | One person |
| POST | `/api/persons` | Add a person `{ name, number }` |
| PUT | `/api/persons/:id` | Update a person's number |
| DELETE | `/api/persons/:id` | Delete a person |
| GET | `/info` | Number of persons and the request time |

## Running

```sh
cd phonebook
npm install
cp .env.example .env   # then fill in your own MONGODB_URI
npm run dev            # node --watch index.js, port 3001 by default
```

To serve the frontend as well, build the Part 2 phonebook app and
copy its `dist/` folder into `phonebook/dist/`.
