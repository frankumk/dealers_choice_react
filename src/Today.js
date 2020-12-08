import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment'

class Today extends Component{
    constructor(){
        super()
        this.state = {
            todaybdays: []
        }
    }

    async componentDidMount(){
        const friends = (await axios.get('/api/friends')).data;
        const todayMM = moment().format("MM");
        const todayDD = moment().format("DD");
        const arr = friends.filter((friend)=>{
            const mm = friend.birthday.slice(5,7);
            const dd = friend.birthday.slice(8,10);
            if(mm==todayMM && dd == todayDD){
                return true;
            }else{
            return false;
            }
        })
        this.setState({todaybdays: arr})

    }

    render(){
        const bdays = this.state.todaybdays;
        return(
            <div id = 'birthdays'>
                <h3>Today</h3>
                <p>There { bdays.length === 1 ? 'is ' : 'are '}{bdays.length} birthday{ bdays.length === 1 ? '.' : 's.'}</p>
                <ul id='todays-list'>
                    {
                        bdays.map((bday)=>{
                            return (
                                <div className='display-today' key ={bday.name}>
                                    <li className='today' key={bday.id}><img className = 'face' />Happy Birthday, {bday.name}!<p key = {bday.birthday}>Send Flowers</p></li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Today