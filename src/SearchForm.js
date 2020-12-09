import React, {Component} from 'react';

class SearchForm extends Component{
    constructor(){
        super()
        this.state= {
            search: ''
        }
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(e){
        this.setState({search: e.target.value});
        console.log(this.state.search)
    }

    render(){
        return (
            <div id= 'search'>
                <form id='search-form'>
                    <label>Search:
                        <input id = 'searchbar' type = 'text' name='searchbar' placeholder = 'Search friends to find birthday' onChange={this.handleSearch}></input>
                    </label>
                </form>
            </div>
        )
    }
}

export default SearchForm