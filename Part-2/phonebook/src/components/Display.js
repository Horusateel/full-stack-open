const Display = ({ persons, handleDelete }) => {
    const allPersons = persons.map(ele => {
        return (
            <div key={ele.name}>
                {ele.name} {ele.number}
                <button onClick={() => handleDelete(ele.id)}>delete</button>
            </div>
        )
    })

    return (
        <>
        {allPersons}
        </>
    )
}

export default Display;