// const http = require('http')

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]
// const app = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     res.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)


const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
  })

  app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.json(notes[id])
    console.log(notes[id])
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })