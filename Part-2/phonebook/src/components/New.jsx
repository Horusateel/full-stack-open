const New = ({ handleSubmit, newContact, handleContact }) => {
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
            name: <input value={newContact.name} onChange={handleContact} name="name"/>
            </div>
            <div>
            number: <input value={newContact.number} onChange={handleContact} name="number"/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default New;