import React, {Component} from 'react';

class Today extends Component{
    constructor(){
        super()
        this.state = {
            todaybdays: []
        }
    }
    render(){
        return(
            <div id = 'birthdays'>
                <h3>Today</h3>
                <p>There are {this.state.todaybdays.length} birthdays</p>
            </div>
        )
    }
}

export default Today