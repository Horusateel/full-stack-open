import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Panel = ({buttons}) =>
    <>
    {buttons.map((it, ind) => <Button text={it.text} onClick={it.onClick} key={ind} />)}
    </>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNew = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVote = () => setVotes(prev => [...prev].map((it, ind) => ind === selected ? ++it : it))

  const buttons = [
    {text: 'vote', onClick: handleVote},
    {text: 'new anecdote', onClick: handleNew},
  ]

  // biggest value in the array, finding its index
  const bigg = Math.max(...votes)
  const ind = votes.findIndex(it => it === bigg)

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>{anecdotes[selected]}</div>
    {votes[selected] ? <div>has {votes[selected]} votes</div> : <div>has 0 votes</div>}
    <Panel buttons={buttons}/>

    <h1>Anecdote with most votes</h1>
    {votes[ind] ?
      <>        
      <div>{anecdotes[ind]}</div>
      <div>has {votes[ind]} votes</div>
      </> :
      <div>Start voting</div>
    }
    </>
  )
}

export default App
