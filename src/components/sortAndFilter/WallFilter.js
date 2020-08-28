import React from 'react'
import './filterMenu.scss'

const WallFilter = ({filterSelection, handleFilterChange}) => {

return (
    <>
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
    </>
)}

export default WallFilter
                