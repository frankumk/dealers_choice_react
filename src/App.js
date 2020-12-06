import React, { Component} from 'react';
import axios from 'axios';
import AddForm from './AddForm';
import SearchForm from './SearchForm';
import Friend from './Friend';
import Today from './Today'

class App extends Component{
    constructor(){
        super()
        this.state = {
            friends: [],
        }
    }

    async componentDidMount(){
        const friends = (await axios.get('../api/friends')).data;
        this.setState({ friends });
    }

    render(){
        const friends = this.state.friends;
        return(
            <div id = 'main'>
                <h1>Birthday Business</h1>
                <div id='container'>
                    <div className = 'box' id = 'left-side'>
                        <Today />
                    </div>
                    <div className = 'box' id = 'right-side'>
                        <h3>The List</h3>
                        <AddForm />
                        <SearchForm />
                        <ul id = 'friends-list'>
                            {
                                friends.map((friend)=>{
                                    return <Friend friend={friend} key={friend.id} />
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default App