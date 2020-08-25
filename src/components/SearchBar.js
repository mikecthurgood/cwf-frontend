import React, {useState} from 'react'
import './SearchBar.scss'

const SearchBar = ({ sortInputVisible, openSearchBar, openSort, userPostCode, setUserPostCode }) => {
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

        console.log(type, sortInputVisible)
        
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
                    src={sortInputVisible ? '/images/close-cross.png' : '/images/search-icon.png'} 
                    className='search__bar-sort-icon' 
                    alt='search icon' 
                    value='Close' 
                    onClick={() => openInputHandler('sort')}
                    onMouseOver={e => (e.currentTarget.src = sortInputVisible ? '/images/close-cross-black.png' : '/images/search-icon-black.png')} 
                    onMouseOut={e => (e.currentTarget.src = sortInputVisible ? '/images/close-cross.png' : '/images/search-icon.png')} 
                />
                </>
            ) : (
                <>
                <div className='change-post-code-container'>
                    <p className='postcode-confirmation'>{`Sorted by distance from ${userPostCode.toUpperCase()}`}</p>
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