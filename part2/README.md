# Part 2 — Communicating with server

Full Stack Open, Part 2 (exercises 2.1–2.20).

## Apps

| App | Folder | Exercises |
| --- | --- | --- |
| Course info | `courseinfo/` | 2.1–2.5 — rendering a collection, modules, total exercises |
| Phonebook | `phonebook/` | 2.6–2.11, 2.15–2.17 — adding/filtering persons, communicating with a JSON server (`db.json`, port 3001), updating a number, deleting, notifications and error handling |
| Data for countries | `countries/` | 2.18–2.20 — REST Countries data, filtering, `show` button, country details, weather in the capital via OpenWeatherMap |

## Countries (2.18–2.20)

`countries/src/App.jsx` fetches all countries once from
`https://studies.cs.helsinki.fi/restcountries/api/all` and filters
them locally by `name.common`. More than 10 matches shows
“Too many matches, specify another filter”; 2–10 matches are
listed with a `show` button; a single match (or a chosen country)
is rendered by `src/components/Country.jsx`, which also shows the
capital, area, languages, flag and current weather.

Weather uses an OpenWeatherMap API key read only from the
environment variable `VITE_SOME_KEY` (`import.meta.env.VITE_SOME_KEY`).
No API key is stored in the source. Create a `.env` file in
`countries/` with:

```
VITE_SOME_KEY=your-openweathermap-api-key
```

## Running an app

```sh
cd courseinfo   # or phonebook, or countries
npm install
npm run dev
```

For the phonebook, also start the JSON server in a second terminal:

```sh
cd phonebook
npx json-server --port 3001 --watch db.json
```
