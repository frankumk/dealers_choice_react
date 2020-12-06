import React from 'react';

const SearchForm = ()=>{

    return (
        <div id= 'search'>
            <form id='search-form'>
                <label>Search:
                    <input id = 'searchbar' type = 'text' name='searchbar' placeholder = 'Search friends to find birthday'></input>
                </label>
            </form>
        </div>
    )
}

export default SearchForm