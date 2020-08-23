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

    const clearPostcode = () => {
        setUserPostCode()
    }

    const openInputHandler = (type) => {
        if (type === 'search') {
            openSearchBar()
        }
        if (type === 'sort') {
            openSort()
        }
        
    }

    return (
        <>
        <div className={`search__bar-sort-container ${!sortInputVisible ? 'visible' : ''}`}>
            {!userPostCode && (<input type='button' value='Sort By Distance' className={`search__bar-sort-button ${!sortInputVisible ? 'visible' : ''}`} onClick={userPostCode ? () => console.log('sorting') : openSort} />)}
            
            {userPostCode && 
            <>
            <div className='change-post-code-container'>
                <p>{`distance from ${userPostCode.toUpperCase()}`}</p>
                <span>
                    <p className='changePostcode' onClick={() => openInputHandler('sort')}>{`Change`}</p>
                    <p className='changePostcode' onClick={clearPostcode}>{`Clear`}</p>
                </span>
            </div>
            </>
                }
        </div>
        <div className='postcode-search-container'>
            <form onChange={handlePostCodeChange} onSubmit={handleSetPostCode} autocomplete="off">
                <input type="submit" value='Set Postcode' className={`search__bar-button ${sortInputVisible ? 'visible' : ''}`} />
                <input type="text" placeholder='Enter Postcode' name='searchInput' className={`search__bar-sort-input ${sortInputVisible ? 'visible' : ''}`} />
                <img src='/images/close-cross.png' alt='search icon' value='Close' className={`${sortInputVisible ? 'visible' : ''}`} onClick={() => openInputHandler('sort')} onMouseOver={e => (e.currentTarget.src = '/images/close-cross-black.png')} onMouseOut={e => (e.currentTarget.src = '/images/close-cross.png' )} />
            </form>
        </div>
        <img src={searchInputVisible ? '/images/close-cross.png' : '/images/search-icon.png'} alt='search icon' value='Close' onClick={() => openInputHandler('search')} onMouseOver={e => (e.currentTarget.src = searchInputVisible ? '/images/close-cross-black.png' : '/images/search-icon-black.png')} onMouseOut={e => (e.currentTarget.src = searchInputVisible ? '/images/close-cross.png' : '/images/search-icon.png')} />
        <div className={`search-box-container ${searchInputVisible ? 'visible' : ''}`}>
            <form onChange={updateFilter} onSubmit={clearFilter} autocomplete="off">
                <input type="submit" value='Clear' className={`search__bar-button ${searchInputVisible ? 'visible' : ''}`} />
                <input type="text" placeholder='Start typing to filter' name='searchInput' className={`search__bar-filter-input ${searchInputVisible? 'visible' : ''}`} />
            </form>
        </div>
        </>
    )
}

export default SearchBar