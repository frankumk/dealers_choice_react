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
            selectedFriendId: '',
            newFriend: '',
            newBirthday: '',
            search: '',
            filtered: []
        }
        this.updateName = this.updateName.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    async componentDidMount(){
        const friends = (await axios.get('/api/friends')).data;
        this.setState({ friends });

        window.addEventListener('hashchange',()=>{
            this.setState({ selectedFriendId: window.location.hash.slice(1)});
        })
        //this.setState({ selectedFriendId: window.location.hash.slice(1)});
    }

    updateName(e){
        this.setState({ newFriend: e.target.value });
        //console.log(this.state.name);
    }
    
    updateBirthday(e){
        this.setState({ newBirthday: e.target.value});
        //console.log(this.state.birthday);
    }

    async onSubmit(e){
        e.preventDefault();
        //const name = document.getElementById("add-friend").value;
        //const bday = document.getElementById("new-birthday").value;
        if(this.state.newFriend != "" && this.state.newBirthday !=""){
            const newFriends = (await axios.post('/api/friends',{name: this.state.newFriend,birthday: this.state.newBirthday}));
            this.setState({ friends : newFriends.data });
        }else{
            alert ('do you not have any friends with a birthday? fill in the form!');
        }
        this.setState({newFriend: '', newBirthday: ''})

    }
    // remove(name){

    // }

    handleSearch(e){
        this.setState({search: e.target.value});
        console.log(this.state.search);
    }

    render(){
        const { friends , selectedFriendId , newFriend , newBirthday , search } = this.state;
        return(
            <div id = 'main'>
                <h1>Birthday Business</h1>
                <div id='container'>
                    <div className = 'box' id = 'left-side'>
                        <Today friends={friends} />
                    </div>
                    <div className = 'box' id = 'right-side'>
                        <h3>The List</h3>
                        <AddForm onSubmit={this.onSubmit} newFriend={newFriend} newBirthday={newBirthday} updateName = {this.updateName} updateBirthday={this.updateBirthday} />
                        <SearchForm search={search} handleSearch={this.handleSearch} />
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