import React, { Component } from 'react';

class AddForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            birthday: ''
        }
        this.updateName = this.updateName.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        console.log(this.props);
        //this.props.onSubmit = this.props.onSubmit.bind(this);

    }

    updateName(e){
        this.setState({ name: e.target.value });
        //console.log(this.state.name);
    }
    
    updateBirthday(e){
        this.setState({ birthday: e.target.value});
        //console.log(this.state.birthday);
    }

    render(){
        const pattern = "^(0?[1-9]|1[0-2])/(0?[1-9]|[12][0-9]|3[01])$";
        return (
            <div id='add'>
                <form id='add-form'>
                    <label>Add:
                        <input id='add-friend' type ='text' name='add-friend' placeholder = 'name' value={this.state.name} onChange={(e)=>this.updateName(e)} required></input>
                        <input id='new-birthday' type='text' name='new-birthday' placeholder = 'mm/dd' value={this.state.birthday} onChange={(e)=>this.updateBirthday(e)} pattern={pattern} required></input>
                        <button id='submit' type='submit' onClick={this.props.onSubmit}>+</button>
                    </label>
                </form>
            </div>

        )
    }
}

export default AddForm