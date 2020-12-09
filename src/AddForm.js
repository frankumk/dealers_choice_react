import React, { Component } from 'react';

class AddForm extends Component{
    constructor(props){
        super(props)

    }

    render(){
        const pattern = "^(0?[1-9]|1[0-2])/(0?[1-9]|[12][0-9]|3[01])$";
        return (
            <div id='add'>
                <form id='add-form'>
                    <label>Add:
                        <input id='add-friend' type ='text' name='add-friend' placeholder = 'enter unique name' value={this.props.newName} onChange={(e)=>this.props.updateName(e)} required></input>
                        <input id='new-birthday' type='text' name='new-birthday' placeholder = 'mm/dd' value={this.props.newBirthday} onChange={(e)=>this.props.updateBirthday(e)} pattern={pattern} required></input>
                        <button id='submit' type='submit' onClick={this.props.onSubmit}>+</button>
                    </label>
                </form>
            </div>

        )
    }
}

export default AddForm