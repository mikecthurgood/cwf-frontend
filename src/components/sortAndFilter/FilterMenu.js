import React, {useState} from 'react'
import './filterMenu.scss'

const FilterMenu = ({filterSelection, setFilterSelection}) => {

    // const handleSetPostCode = (e) => {
    //     e.preventDefault()
    //     const valid = setUserPostCode(postCodeInput)
    //     if (valid.status) {
    //         return openSort()
    //     }
    // }

    const [visible, setVisibility] = useState(false)

    const toggleMenuVisibility = () => {
        setVisibility(!visible)
    }

    const handleFilterChange = (e) => {
        const selection = e.target.name
        const updatedFilters = filterSelection
        updatedFilters[selection] = !filterSelection[selection]
        setFilterSelection({...updatedFilters})
    }

    const clearFilters = () => {
        setFilterSelection({top: true, bouldering: true, auto: true, lead: true})
    }

    // const openInputHandler = (type) => {
    //     if (type === 'sort') {
    //         openSort()
    //     }        
    // }

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
            <div className={`filter__menu-form-container ${visible ? 'visible' : ''}`} >
                <label className='filter__menu-form-heading'>
                        <strong>Wall Type</strong>
                </label>
                <form>
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
                </form>
            </div>
        </div>
        </>
    )
}

export default FilterMenu