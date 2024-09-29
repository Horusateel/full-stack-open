import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  // initializing variables
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [weather, setWeather] = useState({temperature: '', wind: ''})

  // initialize the data
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => setCountries(res.data))
  }, [])

  // searching
  const handleSearch = (event) => {
    setCountry(event.target.value)
    setFiltered(countries.filter(ele => ele.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  // different displays of results: one outcome - < 10 outcomes - > 10 outcomes
  if (filtered.length == 1) {
    const lang = Object.values(filtered[0].languages).map(ele => <li key={ele}>{ele}</li>)
    const key = import.meta.env.VITE_API_KEY
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${filtered[0].capital}&aqi=no`)
      .then(res => setWeather({temperature: res.data.current.temp_c, wind: res.data.current.wind_kph}))
    
    return (
      <>
      <div>
        <form>
          find countries <input value={country} onChange={handleSearch}/>
        </form>
        <div>
          <h1>{filtered[0].name.common}</h1>
          <div>capital: {filtered[0].capital}</div>
          <div>area: {filtered[0].area}</div>
          <h3>languages</h3>
          <ul>
            {lang}
          </ul>
          <img src={filtered[0].flags.png} />
          <h3>weather in {filtered[0].capital}</h3>
          <ul>
            <li>temperature: {weather.temperature} C</li>
            <li>wind: {weather.wind} K/H</li>
          </ul>
        </div>
      </div>
      </>
    )    
  } else if (filtered.length > 10 || filtered.length === 0) {

    return (
      <>
      <div>
        <form>
          find countries <input value={country} onChange={handleSearch}/>
        </form>
        <div>
          Too many matches, specify another filter
        </div>
      </div>
      </>
    )
  } else {
    const handleChoose = (event) => {
      setFiltered(countries.filter(ele => ele.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    const list = filtered.map(ele => {
      return (
        <div key={ele.name.common}>
          {ele.name.common}
          <button onClick={handleChoose} value={ele.name.common}>show</button>
        </div>
      )
    })

    return (
      <>
      <div>
        <form>
          find countries <input value={country} onChange={handleSearch}/>
        </form>
        <div>
          {list}
        </div>
      </div>
      </>
    )    
  }

}

export default App