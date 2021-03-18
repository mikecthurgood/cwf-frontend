import React, {useState, useContext} from 'react'
import { Dispatch, State } from '../../context/Store'

import './filterMenu.scss'

const WallFilter = React.lazy(() => import('./WallFilter'))
const PostcodeSort = React.lazy(() => import('./PostcodeSort'))

const FilterMenu = () => {
    const dispatch = useContext(Dispatch)
    const {filterSelection, userPostCode } = useContext(State)

    const [postCodeInput, setPostCodeInput ] = useState(userPostCode)
    const [postCodeInputVisible, setPostCodeInputVisible] = useState(false)
    const [visible, setVisibility] = useState(false)

    function handleSetPostCode (e) {
        e.preventDefault()
        setPostCodeInputVisible(false)
        let newPostcode
        const postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i; 
        if (!postCodeInput) {
            newPostcode = ''
            localStorage.removeItem('userPostcode')
        }
        const validPostcode = postcodeRegEx.test(postCodeInput); 
        if (validPostcode) {
            newPostcode = postCodeInput
            localStorage.setItem('userPostcode', postCodeInput)
        }
        dispatch({ type: 'setPostCode', data: newPostcode }) 
    }

    function handlePostCodeChange (e) {
        setPostCodeInput(e.target.value)
    }

    function clearPostcode () {
        setPostCodeInput('')
        dispatch({ type: 'setPostCode', data: '' })
    }

    function toggleMenuVisibility () {
        setVisibility(!visible)
    }

    function handleFilterChange (e) {
        const selection = e.target.name
        const updatedFilters = filterSelection
        updatedFilters[selection] = !filterSelection[selection]
        dispatch({ type: 'setFilterSelection', data: {...updatedFilters} })
    }

    function clearFilters () {
        dispatch({ type: 'setFilterSelection', data: {top: true, bouldering: true, auto: true, lead: true} })
    }

    return (
        <>
        <div className={`filter__menu-background-fade ${visible ? 'visible' : ''}`} onClick={toggleMenuVisibility}>
        </div>
        <div className='filter__menu-container'>
            <label className='filter__menu-title' onClick={toggleMenuVisibility}>
                <label className='filter__menu-icon'>
                        <strong>{`${visible ? '-' : '+'}`}</strong>
                </label>
                    <strong>Sort & Filter </strong>
            </label>
            <div className={`filter__menu-filter-container ${visible ? 'visible' : ''}`} >
                <div className='filter__menu-filter-item' >
                    <WallFilter 
                        handleFilterChange={handleFilterChange}
                    />
                </div>
                <div className='filter__menu-filter-item' >
                    <PostcodeSort 
                        postCodeInput={postCodeInput}
                        handlePostCodeChange={handlePostCodeChange}
                        handleSetPostCode={handleSetPostCode}
                        userPostCode={userPostCode}
                        clearPostcode={clearPostcode}
                        postCodeInputVisible={postCodeInputVisible}
                        setPostCodeInputVisible={setPostCodeInputVisible}
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default FilterMenu