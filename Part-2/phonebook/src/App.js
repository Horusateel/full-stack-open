import { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import Search from './components/Search'
import New from './components/New'
import Display from './components/Display'
import services from './services/notes'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  // fetching data
  useEffect(() => {
    services
      .getAll()
      .then(res => {
        setPersons(res)
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
      if (window.confirm(
        `${newName} is already added, replace the old number with a new one?`
      )) {
        const id = persons.find(ele => ele.name === newName).id
        const updatedObj = {
          ...persons.find(ele => ele.name === newName),
          number: newNumber
        }
        setPersons(prev => prev.map(ele => ele.id === id ? updatedObj : ele))
        services
          .update(id, updatedObj)
          .then(res => res)
        setNewName('')
        setNewNumber('')
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      const newObj = {
        name: newName,
        number: newNumber
      }
      setPersons(prev => [...prev, newObj])
      services
        .create(newObj)
        .then(res => res)
      setNewName('')
      setNewNumber('')
    }
  }
  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(ele => ele.id === id).name}?`)) {
      // from server
      services
        .deleteItem(id)
        .then(res => res)

      // from react
      setPersons(prev => prev.filter(ele => ele.id !== id))
    }
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
      <Display persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;