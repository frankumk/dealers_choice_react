import React, {Component} from 'react';

class SearchForm extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div id= 'search'>
                <form id='search-form'>
                    <label>Search:
                        <br /><input id = 'searchbar' type = 'text' name='searchbar' placeholder = 'Search friends' value={this.props.search} onChange={(e)=>this.props.handleSearch(e)} />
                    </label>
                </form>
            </div>
        )
    }
}

export default SearchForm