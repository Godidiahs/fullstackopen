# Part 1 — Introduction to React

Exercises 1.1–1.14, all completed. Each application is a Vite + React 19 project; run it with `npm install` and then `npm run dev`.

## courseinfo — exercises 1.1–1.5

`part1/courseinfo` — the course information app, in its final form: the course is a single object with a name and an array of parts, rendered with `Header`, `Content` (three `Part` components) and `Total` components. It shows the course "Half Stack application development" with Fundamentals of React (10 exercises), Using props to pass data (7) and State of a component (14), for a total of 31 exercises.

## unicafe — exercises 1.6–1.11

`part1/unicafe` — customer feedback app, in its final form: good / neutral / bad buttons, a `Statistics` component that shows "No feedback given" when there is no feedback, and otherwise displays the feedback in a table (good, neutral, bad, all, average and positive) using `StatisticLine` rows and a `Button` component.

## anecdotes — exercises 1.12–1.14

`part1/anecdotes` — software engineering anecdotes: a random anecdote with a "next anecdote" button, a vote button that records a vote for the displayed anecdote, and the anecdote with the most votes (with its vote count) shown below.
