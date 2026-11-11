import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

// Exercises 2.18-2.20: Data for countries
// Fetches all countries once from the REST Countries API
// (https://studies.cs.helsinki.fi/restcountries/). Filtering is
// done locally. Weather for the capital is shown by the
// Country component, which reads the OpenWeatherMap key from
// import.meta.env.VITE_SOME_KEY -- no key is stored in source.

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.error('Failed to fetch countries', error))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelected(null)
  }

  const matches = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : []

  const countryToShow = selected || (matches.length === 1 ? matches[0] : null)

  return (
    <div>
      <div>
        find countries{' '}
        <input value={filter} onChange={handleFilterChange} />
      </div>

      {countryToShow ? (
        <Country country={countryToShow} />
      ) : matches.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : matches.length > 1 ? (
        <ul>
          {matches.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => setSelected(country)}>show</button>
            </li>
          ))}
        </ul>
      ) : filter ? (
        <p>No matches</p>
      ) : null}
    </div>
  )
}

export default App
