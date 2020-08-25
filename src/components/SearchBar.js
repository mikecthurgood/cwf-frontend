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
        <div className='search__bar-sort-container'>
            <div className='search__bar-sort-button-container'>

            {!userPostCode ? (
                <>
                <input 
                    type='button' 
                    value={sortInputVisible ? 'Enter Postcode' : 'Sort By Distance'}
                    className='search__bar-sort-button'
                    onClick={() => openInputHandler('sort')}
                />
                <img 
                    src={searchInputVisible ? '/images/close-cross.png' : '/images/search-icon.png'} 
                    className='search__bar-sort-icon' 
                    alt='search icon' 
                    value='Close' 
                    onClick={() => openInputHandler('sort')}
                    onMouseOver={e => (e.currentTarget.src = searchInputVisible ? '/images/close-cross-black.png' : '/images/search-icon-black.png')} 
                    onMouseOut={e => (e.currentTarget.src = searchInputVisible ? '/images/close-cross.png' : '/images/search-icon.png')} 
                />
                </>
            ) : (
                <>
                <div className='change-post-code-container'>
                    <p>{`Sorted by distance from ${userPostCode.toUpperCase()}`}</p>
                    <span>
                        <p className='changePostcode' onClick={() => openInputHandler('sort')}>{`Change`}</p>
                        <p className='changePostcode' onClick={clearPostcode}>{`Clear`}</p>
                    </span>
                </div>
                </>
            )
        }
            </div>
            <div className='search__bar-sort-input-container'>
                <form 
                    onChange={handlePostCodeChange} 
                    onSubmit={handleSetPostCode} 
                    autoComplete="off"
                >
                    <input 
                        type="text" 
                        placeholder='Enter Postcode' 
                        name='searchInput' 
                        className={`search__bar-sort-input ${sortInputVisible ? 'visible' : ''}`} 
                    />
                    
                </form>
            </div>
        </div>
        </>
    )
}

export default SearchBar