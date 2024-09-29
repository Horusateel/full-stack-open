import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])

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
    const list = filtered.map(ele => <div key={ele.name.common}>{ele.name.common}</div>)

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