import React, { Component} from 'react'
import axios from 'axios'
import { render } from 'react-dom'

class App extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div id = 'main'>
            
                <div id= 'search'>
                    <p>Hello World</p>
                    <form>
                        <label>Search:
                            <input id = 'searchbar' type = 'text' name='searchbar' placeholder = 'Search friends to find birthday'></input>
                        </label>
                    </form>
                </div>

                <div id = 'friendsList'>

                </div>
            </div>
        )
    }
}

render(<App />, document.querySelector('#root'));