import React, {useState} from 'react'
import './filterMenu.scss'

const PostcodeSort = ({clearPostcode, postCodeInput, handlePostCodeChange, handleSetPostCode, userPostCode, postCodeInputVisible, setPostCodeInputVisible}) => {

    return (
        <>
            <label className='filter__menu-form-heading'>
                    <strong>Sort by distance</strong>
            </label>
            {userPostCode ?
                <>
                    <div className='change-post-code-container'>
                        <p className='postcode-confirmation'>Sorted by distance from <strong>{userPostCode.toUpperCase()}</strong></p>
                        <form className={`filter__menu-sort-form ${postCodeInputVisible ? 'visible' : ''}`}
                            onSubmit={handleSetPostCode} 
                            autoComplete="off"
                        >
                            <input 
                                type="text" 
                                placeholder='Enter Postcode' 
                                name='searchInput' 
                                className={`filter__menu-sort-input`} 
                                value={postCodeInput}
                                onChange={handlePostCodeChange} 
                            />
                             <input type="submit" value='Set' className='submit-postcode' />
                        </form>
                        <span>
                            <p className='changePostcode' onClick={() => {setPostCodeInputVisible(!postCodeInputVisible)}}>{postCodeInputVisible ? 'Cancel' : 'Change'}</p>
                            <p className='changePostcode' onClick={clearPostcode}>{`Clear`}</p>
                        </span>
                    </div>
                </>
                :
                <form className='filter__menu-sort-form visible'
                    onSubmit={handleSetPostCode} 
                    autoComplete="off"
                >
                    <input 
                        type="text" 
                        placeholder='Enter Postcode' 
                        name='searchInput' 
                        className={`filter__menu-sort-input`} 
                        value={postCodeInput}
                        onChange={handlePostCodeChange} 
                    />
                    <input type="submit" value='Set' className='submit-postcode' />
                </form>
            }
            {/* <form>
                <label className='filter__menu-checkbox'>
                    Bouldering: 
                    <input
                        name="bouldering"
                        type="checkbox"
                        checked={filterSelection.bouldering}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
                <label className='filter__menu-checkbox'>
                    Top Roping: 
                    <input
                        name="top"
                        type="checkbox"
                        checked={filterSelection.top}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
                <label className='filter__menu-checkbox'>
                    Lead: 
                    <input
                        name="lead"
                        type="checkbox"
                        checked={filterSelection.lead}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
                <label className='filter__menu-checkbox'>
                    Auto Belay: 
                    <input
                        name="auto"
                        type="checkbox"
                        checked={filterSelection.auto}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
            </form> */}
        </>
    )
}

export default PostcodeSort
                