
const Course = ({ course }) => {
    const parts = course.parts.map(el => <p key={el.id}>{el.name} {el.exercises}</p>)
    const exercises = course.parts.reduce((acc, ele) => acc += ele.exercises, 0)
    
    return (
        <>
        <h1>{course.name}</h1>
        <div>
            {parts}
        </div>
        <h4>total of {exercises} exercises</h4>
        </>

    )
}

export default Course;