# Part 4 — Testing Express servers, user administration

Full Stack Open, Part 4 (exercises 4.1–4.23).

## App

`bloglist/` — the blog list backend (Express + MongoDB + Mongoose).

## Exercises covered

- 4.1–4.2 — project structure (`index.js` starts the server,
  `app.js` holds the Express app, `utils/config.js` and
  `utils/logger.js`), the `Blog` model, `GET /api/blogs`.
- 4.3–4.7 — `utils/list_helper.js`: `dummy`, `totalLikes`,
  `favoriteBlog`, `mostBlogs` and `mostLikes`, with unit tests
  in `tests/blog_api.test.js`.
- 4.8–4.14 — API tests with Supertest and Node's test runner:
  blogs are returned as JSON, the unique identifier is `id`,
  a blog can be added (likes defaults to 0), a blog without
  `title` or `url` is rejected with 400, a blog can be deleted
  and updated.
- 4.15–4.17 — user administration: `User` model, bcrypt
  password hashing, `POST /api/users` (username and password
  at least 3 characters, username unique), blogs are populated
  with their creator and users with their blogs.
- 4.18–4.21 — token authentication: `POST /api/login` returns a
  JWT; `middleware.tokenExtractor` and `middleware.userExtractor`
  read it, a blog can only be added with a token and only deleted
  by the user who created it.
- 4.22–4.23 — `utils/middleware.js` error handling (CastError,
  ValidationError, duplicate username, invalid/expired token)
  and the tests use a separate test database (`TEST_MONGODB_URI`).

## API

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/blogs` | List blogs, with creator populated |
| POST | `/api/blogs` | Add a blog (token required) |
| DELETE | `/api/blogs/:id` | Delete a blog (creator only) |
| PUT | `/api/blogs/:id` | Update a blog |
| POST | `/api/blogs/:id/comments` | Add a comment (used by Part 7) |
| GET | `/api/users` | List users, with blogs populated |
| POST | `/api/users` | Create a user |
| POST | `/api/login` | Log in, returns `{ token, username, name }` |

## Running

```sh
cd bloglist
npm install
cp .env.example .env   # then fill in MONGODB_URI, TEST_MONGODB_URI, SECRET
npm run dev            # port 3003 by default
npm test               # NODE_ENV=test node --test
```
