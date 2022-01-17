import React, { useState } from "react";


const SearchBar = (props) => {


    const [showInput, setShowInput] = useState(false)
    const { selectPrevMatch, selectNextMatch, searchFocusIndex, searchFoundCount, onSearchChange, searchString } = props;

    const SearchIcon = () => {
        return (
            <span className="search-box__icon" onClick={() => setShowInput(!showInput)}>
                <i className="simple-icon-magnifier" />
            </span>
        )
    }

    return (
        <>
            {showInput ? <div className="search-box">
                <SearchIcon />
                <input
                    value={searchString}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {
                    searchString?.length > 0 &&
                    <>
                        <span className="search-box__count m-1">{searchFoundCount > 0 ? searchFocusIndex + 1 : 0} / {searchFoundCount}</span>
                        <div className="search-box__controls m-1">
                            <span onClick={selectPrevMatch}>
                                <i className="simple-icon-arrow-up" />
                            </span>
                            <span onClick={selectNextMatch} className="m-1">
                                <i className="simple-icon-arrow-down" />
                            </span>
                        </div>
                    </>
                }

            </div> :
                <SearchIcon />}
        </>
    )
}


export default SearchBar;