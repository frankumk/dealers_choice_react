import React , { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class Friend extends Component{
    constructor(props){
        super(props)
        this.state = {
            friend: {}
        }
    }
    async componentDidUpdate(prevProps){
        if(prevProps.selectedFriendId !== this.props.selectedFriendId){
            const friend = (await axios.get(`/api/friends/${this.props.selectedFriendId}`)).data;
            this.setState({ friend });
        }
    }

    async componentDidMount(){
        const friend = (await axios.get(`/api/friends/${this.props.selectedFriendId}`)).data;
        //console.log(friend)
        this.setState({ friend });
    }

    render(){
        const { friend } = this.state;
        const bdayMonth = moment(friend.birthday).format("MMM");
        const bdayDate = moment(friend.birthday).format("DD");
        return (
            <div id='detail'>
                <h3>{`${friend.name}'s birthday is ${bdayMonth} ${bdayDate}`}</h3>
                <button onClick={this.props.handleDelete}>x</button>
            </div>
        )
    }
}

export default  Friend