const Display = ({ persons, handleDelete, filtered }) => {
    const allPersons = filtered.length === 0
    ? persons.map(ele => {
        return (
            <div key={ele.name}>
                {ele.name} {ele.number}
                <button onClick={() => handleDelete(ele.id)}>delete</button>
            </div>
        )
    })
    : filtered.map(ele => {
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