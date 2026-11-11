# Part 5 — Testing React apps

Full Stack Open, Part 5 (exercises 5.1–5.23).

## App

`bloglist-frontend/` — the blog list frontend (React + Vite),
using the Part 4 backend (`/api/blogs`, `/api/login`).

## Exercises covered

- 5.1–5.2 — the frontend uses the backend at `/api` (Vite proxy
  to the Part 4 backend on port 3003) and the login form is
  extracted into `LoginForm`.
- 5.3–5.4 — a shared `Togglable` component hides the blog
  creation form; notifications show success (green) and error
  (red) messages (`Notification`, `index.css`).
- 5.5–5.6 — a blog's details (url, likes, user) are shown only
  after clicking `view`; the blog form is in `BlogForm`.
- 5.7 — failed login shows "wrong username or password".
- 5.8 — React's `useRef` / `useImperativeHandle` in `Togglable`
  hides the form after a blog is created.
- 5.9 — blogs can be liked, with `PUT /api/blogs/:id`.
- 5.10–5.11 — blogs are sorted by likes, most liked first;
  a blog can be deleted (with `window.confirm`) only by the user
  who created it.
- 5.12–5.16 — component PropTypes, and the frontend structure
  with `services/blogs.js` (token handling) and
  `services/login.js`.
- 5.17–5.23 — end-to-end (Playwright) tests in
  `tests/blog_app.spec.js`: the login form is shown, login
  succeeds/fails, a blog can be created, liked and deleted by
  its creator, and blogs are ordered by likes.

The Playwright tests use a test database. They reset the backend
with `POST /api/testing/reset`; add a testing router to the Part 4
backend (in test mode only) before running them.

## Running

```sh
cd bloglist-frontend
npm install
npm run dev    # start the Part 4 backend first (port 3003)
npm test       # playwright test
```
