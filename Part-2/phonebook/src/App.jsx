import { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import Search from './components/Search'
import New from './components/New'
import Display from './components/Display'
import Notification from './components/Notification'
import services from './services/notes'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newContact, setNewContact] = useState({name: '', number: ''})
  const [searchName, setSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)


  // fetching data
  useEffect(() => {
    services
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])


  // Event handling
  const handleContact = (event) => {
    setNewContact(prev => ({
      ...prev,
      [event.target.name === "name" ? "name" : "number"]: event.target.value
    }))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(ele => isEqual(newContact.name, ele.name))) {
      if (window.confirm(
        `${newContact.name} is already added, replace the old number with a new one?`
      )) {
        const id = persons.find(ele => ele.name === newContact.name).id
        const updatedObj = {
          ...persons.find(ele => ele.name === newContact.name),
          number: newContact.number
        }
        setPersons(prev => prev.map(ele => ele.id === id ? updatedObj : ele))
        services
          .update(id, updatedObj)
          .then(res => {
            setSuccessMessage(`${newContact.name} contact was updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
        setNewContact({name: '', number: ''})
      } else {
        setNewContact({name: '', number: ''})
      }
    } else {
      const newObj = {
        name: newContact.name,
        number: newContact.number
      }
      setPersons(prev => [...prev, newObj])
      services
        .create(newObj)
        .then(res => {
          setSuccessMessage(`${newContact.name} contact was added`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      setNewContact({name: '', number: ''})
    }
  }
  const handleSearch = (event) => {
    setSearchName(event.target.value)
    setFiltered(persons.filter(ele => ele.name.toLowerCase().startsWith(event.target.value.toLowerCase())))
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
      <Notification successMessage={successMessage}/>
      <Search searchName={searchName} handleSearch={handleSearch}/>
      <h2>Add new name</h2>
      <New 
        handleSubmit={handleSubmit}
        newContact={newContact}
        handleContact={handleContact}
      />
      <h2>Numbers</h2>
      <Display
        persons={persons}
        handleDelete={handleDelete}
        filtered={filtered}
      />
    </div>
  )
}

export default App;