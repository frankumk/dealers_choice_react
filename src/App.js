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
        }
        this.updateName = this.updateName.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    
    async componentDidMount(){
        const friends = (await axios.get('/api/friends')).data;
        this.setState({ friends: friends, filtered: friends });

        window.addEventListener('hashchange',()=>{
            this.setState({ selectedFriendId: window.location.hash.slice(1)});
        })
        this.setState({ selectedFriendId: window.location.hash.slice(1)});
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
        const regex = "^(0?[1-9]|1[0-2])/(0?[1-9]|[12][0-9]|3[01])$";
        const patternMatch = this.state.newBirthday.match(regex);
        const nameExists = this.state.friends.map((friend)=>friend.name).filter((name)=>(name===this.state.newFriend));
        if(!patternMatch){
            alert('Birthday must be form mm/dd');
        }else if(nameExists.length>0){
            alert('Name should be unique');
        }
        else if(this.state.newFriend != "" && this.state.newBirthday !=""){
            const newFriends = (await axios.post('/api/friends',{name: this.state.newFriend,birthday: this.state.newBirthday}));
            this.setState({ friends : newFriends.data });
        }else{
            alert ('do you not have any friends with a birthday? fill in the form (with the correct format and unique name!');
        }
        this.setState({ newFriend: '', newBirthday: ''});
        const name = document.getElementById("add-friend").value='';

    }
    async handleDelete(){
        const {selectedFriendId,friends} = this.state;
        const friender = friends.find((friend)=>friend.id == selectedFriendId);
        console.log(selectedFriendId);
        console.log(friender);
        const deleteme = (await axios.delete('/api/friends',{data: {name: friender.name, birthday: friender.birthday }}));
        this.setState({ friends: deleteme.data, selectedFriendId: ''});
    }

    handleSearch(e){
        this.setState({search: e.target.value.toLowerCase()});
        //console.log(this.state.search);
    }
    

    render(){
        const { friends , selectedFriendId , newFriend , newBirthday , search } = this.state;
        const filtered = friends.filter(friend=>{
            return friend.name.toLowerCase().includes(this.state.search);
        })
        //console.log(filtered);
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
                                    filtered.map((friend)=>{
                                        return <li key={friend.id}><a href={`#${friend.id}`} className = { selectedFriendId*1 === friend.id ? 'selected' : ''}>{friend.name}</a></li>
                                    })
                                }
                            </ul>
                        </div>
                        <div id='bday-display'>
                            {
                                !!selectedFriendId && <Friend handleDelete={this.handleDelete} selectedFriendId={selectedFriendId} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App