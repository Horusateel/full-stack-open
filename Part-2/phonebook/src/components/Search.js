const Search = ({searchName, handleSearch}) => {

    return (
        <>
        filter shown with <input value={searchName} onChange={handleSearch}></input>
        </>
    )
}

export default Search;