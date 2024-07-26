import { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import Search from './components/Search'
import New from './components/New'
import Display from './components/Display'
import axios from 'axios'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  // fetching data
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])


  // Event handling
  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(ele => isEqual(newName, ele.name))) {
      alert(`${newName} already exists`)
    } else {
      setPersons(prev => [
        ...prev,
        { name: newName, number: newNumber}
      ])
      setNewName('')
      setNewNumber('')
    }
  }
  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchName={searchName} handleSearch={handleSearch}/>
      <h2>Add new name</h2>
      <New
        handleSubmit={handleSubmit}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Display persons={persons} />
    </div>
  )
}

export default App;