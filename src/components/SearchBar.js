import React from 'react'

const SearchBar = ({ updateFilter, clearFilter }) => (
    <div>
        <form onChange={updateFilter} onSubmit={clearFilter}>
            <input type="text" placeholder='Search by region or wall name' name='searchInput' className='searchInput' />
            <input type="submit" value='Clear' className='searchButton' />
        </form>
    </div>
)

export default SearchBar