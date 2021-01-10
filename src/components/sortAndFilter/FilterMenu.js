import React, {useState} from 'react'
import './filterMenu.scss'

const WallFilter = React.lazy(() => import('./WallFilter'))
const PostcodeSort = React.lazy(() => import('./PostcodeSort'))

const FilterMenu = ({filterSelection, setFilterSelection, userPostCode, setUserPostCode}) => {

    const [postCodeInput, setPostCodeInput ] = useState(userPostCode)
    const [postCodeInputVisible, setPostCodeInputVisible] = useState(false)
    const [visible, setVisibility] = useState(false)

    function handleSetPostCode (e) {
        e.preventDefault()
        setPostCodeInputVisible(false)
        const valid = setUserPostCode(postCodeInput)
    }

    function handlePostCodeChange (e) {
        setPostCodeInput(e.target.value)
    }

    function clearPostcode () {
        setPostCodeInput('')
        setUserPostCode('')
    }

    function toggleMenuVisibility () {
        setVisibility(!visible)
    }

    function handleFilterChange (e) {
        const selection = e.target.name
        const updatedFilters = filterSelection
        updatedFilters[selection] = !filterSelection[selection]
        setFilterSelection({...updatedFilters})
    }

    function clearFilters () {
        setFilterSelection({top: true, bouldering: true, auto: true, lead: true})
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
                        filterSelection={filterSelection}
                        handleFilterChange={handleFilterChange}
                    />
                </div>
                <div className='filter__menu-filter-item' >
                    <PostcodeSort 
                        filterSelection={filterSelection}
                        handleFilterChange={handleFilterChange}
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