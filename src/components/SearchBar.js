import React, {useState} from 'react'
import './SearchBar.scss'

const SearchBar = ({ updateFilter, clearFilter, searchInputVisible, sortInputVisible, openSearchBar, openSort, userPostCode, setUserPostCode }) => {
    const [postCodeInput, setPostCodeInput ] = useState(userPostCode)

    const handleSetPostCode = (e) => {
        e.preventDefault()
        const valid = setUserPostCode(postCodeInput)
        if (valid.status) openSort()
    }

    const handlePostCodeChange = (e) => {
        setPostCodeInput(e.target.value)
    }

    return (
        <>
        <div className={`search__bar-sort ${!sortInputVisible ? 'visible' : ''}`}>
            <input type='button' value='Sort By Distance' className={`search__bar-sort-button ${!sortInputVisible ? 'visible' : ''}`} onClick={userPostCode ? () => console.log('sorting') : openSort} />{userPostCode && 
            <>
            <div className='change-post-code-container'>
                <p>{`(sorted by distance from ${userPostCode.toUpperCase()})`}</p>
                <p className='changePostcode' onClick={openSort}>{`Change postcode`}</p>
            </div>
            </>
                }
        </div>
        <div className='postcode-search-container'>
            <form onChange={handlePostCodeChange} onSubmit={handleSetPostCode} autocomplete="off">
                <input type="submit" value='Set Postcode' className={`search__bar-button ${sortInputVisible ? 'visible' : ''}`} />
                <input type="text" placeholder='Enter Postcode' name='searchInput' className={`search__bar-input ${sortInputVisible ? 'visible' : ''}`} />
                <input type='button' value='Cancel' className={`search__bar-button close-sort ${sortInputVisible ? 'visible' : ''}`} onClick={openSort} />
            </form>
        </div>
        <img src='/images/search-icon.png' alt='search icon' value='Close' onClick={openSearchBar} onMouseOver={e => (e.currentTarget.src = '/images/search-icon-black.png')} onMouseOut={e => (e.currentTarget.src = '/images/search-icon.png')} />
        <div className='search-box-container'>
            <form onChange={updateFilter} onSubmit={clearFilter} autocomplete="off">
                <input type="submit" value='Clear' className={`search__bar-button ${searchInputVisible ? 'visible' : ''}`} />
                <input type="text" placeholder='Start typing to filter' name='searchInput' className={`search__bar-input ${searchInputVisible? 'visible' : ''}`} />
            </form>
        </div>
        </>
    )
}

export default SearchBar