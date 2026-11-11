import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!apiKey) return
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [capital])

  if (!apiKey) {
    return <p>Weather data requires an OpenWeather API key set as VITE_SOME_KEY.</p>
  }
  if (!weather) {
    return <p>Loading weather...</p>
  }
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital && country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      {country.capital && <Weather capital={country.capital[0]} />}
    </div>
  )
}

export default Country
