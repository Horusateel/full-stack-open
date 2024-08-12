let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/info', (req, res) => {
  res.status(200).send(`Phonebook has info for ${persons.length} people<br/>${new Date().toString()}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const note = persons.find(ele => ele.id === id)
  note
  ? res.status(200).send(note)
  : res.status(404).send('not found')
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(ele => ele.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.number) {
    res.status(400).json({ error: 'content missing' })
  } else if (persons.find(ele => ele.name === req.body.name)) {
    res.status(406).json({ error: 'name must be unique' })
  } else {
    const id = Math.floor(Math.random() * 100)
    const person = {
      id: id,
      ...req.body
    }
  
    persons = persons.concat(person)
    res.status(200).send('added')
  }
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})