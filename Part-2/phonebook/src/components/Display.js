const Display = ({ persons }) => {
    const allPersons = persons.map(ele => <div key={ele.name}>{ele.name} {ele.number}</div>)

    return (
        <>
        {allPersons}
        </>
    )
}

export default Display;