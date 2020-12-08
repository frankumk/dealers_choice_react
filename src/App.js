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
            selectedFriendId: ''
        }
    }
    
    async componentDidMount(){
        const friends = (await axios.get('/api/friends')).data;
        this.setState({ friends });

        window.addEventListener('hashchange',()=>{
            this.setState({ selectedFriendId: window.location.hash.slice(1)});
        })
        //this.setState({ selectedFriendId: window.location.hash.slice(1)});
    }   

    //addNewFriend(){}
    onSubmit(e){
        e.preventDefault();
        console.log(document.getElementById(""));
        // const newFriends = (await axios.post('/api/friends',({data})));
        // this.setState({ friends : newFriends })
    }

    render(){
        const { friends , selectedFriendId } = this.state;
        return(
            <div id = 'main'>
                <h1>Birthday Business</h1>
                <div id='container'>
                    <div className = 'box' id = 'left-side'>
                        <Today friends={friends} />
                    </div>
                    <div className = 'box' id = 'right-side'>
                        <h3>The List</h3>
                        <AddForm onSubmit={()=>onSubmit()} />
                        <SearchForm />
                        <div id='friend-container'>
                            <ul id = 'friends-list'>
                                {
                                    friends.map((friend)=>{
                                        return <li key={friend.id}><a href={`#${friend.id}`} className = { selectedFriendId*1 === friend.id ? 'selected' : ''}>{friend.name}</a></li>
                                    })
                                }
                            </ul>
                        </div>
                        {
                            !!selectedFriendId && <Friend selectedFriendId={selectedFriendId} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default App