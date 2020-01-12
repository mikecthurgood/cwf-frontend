import React from 'react'

const SearchBar = ({ updateFilter, clearFilter }) => (
    <div>
        <form onChange={updateFilter} onSubmit={clearFilter}>
            <input type="text" placeholder='Search by area or wall name' name='searchInput' className='searchInput' /><br />
            <input type="submit" value='Clear Search' className='searchButton' />
        </form>
    </div>
)

export default SearchBar