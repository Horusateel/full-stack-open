const Display = ({ persons, handleDelete, filtered }) => {
    const displayedPersons = (filtered.length === 0 ? persons : filtered).map(ele => {
        return (
            <div key={ele.name}>
                {ele.name} {ele.number}
                <button onClick={() => handleDelete(ele.id)}>delete</button>
            </div>
        )
    })

    return (
        <>
        {displayedPersons}
        </>
    )
}

export default Display;