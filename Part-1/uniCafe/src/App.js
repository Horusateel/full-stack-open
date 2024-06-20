import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Panel = ({controls}) => {
  const buttons = controls.map((it, ind) => <Button text={it.text} onClick={it.onClick} key={ind} />)
  return (
    <>
      {buttons}
    </>
  )
}

const Statisticline = ({text, value}) => 
<>
  <td>{text}: </td>
  <td>{value} {text === 'positive' && '%'}</td>
</>


const Statistics = ({stats}) => {
  const displays = stats.map((it, ind) => <tr key={ind}><Statisticline text={it.text} value={it.value} /></tr>)
  return (
    <>
    <table>
      <tbody>
      {displays}
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // states for input data
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // event handler for clicks (Button, Panel)
  const update = (func) => () => func(prev => prev + 1)

  // descriptive data (Display, Statistics)
  const total = good + neutral + bad
  const average = (good + bad * -1) / total
  const positive = good / total

  // (Button, Panel)
  const controls = [
    {text: 'good', onClick: update(setGood)},
    {text: 'neutral', onClick: update(setNeutral)},
    {text: 'bad', onClick: update(setBad)},
  ]

  // (Display, Statistics)
  const stats= [
    {text: 'good', value: good},
    {text: 'netural', value: neutral},
    {text: 'bad', value: bad},
    {text: 'all', value: total},
    {text: 'average', value: average},
    {text: 'positive', value: positive},
  ]

  return (
    <>
      <h1>Give feedback</h1>
      <Panel controls={controls}/>
      <h1>Statistics</h1>
      {
        good > 0 || neutral > 0 || bad > 0 ?
        <Statistics stats={stats}/> :
        <h3>No feedback given</h3>
      }
    </>
  )
}

export default App
