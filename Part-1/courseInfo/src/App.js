const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>        
      <p>
        {props.p} {props.e}
      </p>
    </>

  )
}

const Content = (props) => {
  return (
    <>
      <Part p={props.parts[0].name} e={props.parts[0].exercises} />
      <Part p={props.parts[1].name} e={props.parts[1].exercises} />
      <Part p={props.parts[2].name} e={props.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {
        props.parts[0].exercises
        + props.parts[0].exercises
        + props.parts[0].exercises
        }
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
