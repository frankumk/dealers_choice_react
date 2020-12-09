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
                                    <li className='today' key={bday.id}>
                                        <img className = 'face' />
                                        <div className = 'salutation'>
                                            <p>Happy Birthday, {bday.name}!</p>
                                            <a className="sendFlowerLink" href='https://www.1800flowers.com/?r=newengengoobrcore&adcampaign=Branded+l_DE1+fe1d&adcampaignid=960097369&adgroupid=46196718405&adid=419485677240&adtype=text&kw=1%20800%20flowers&matchtype=e&addisttype=g&gclid=Cj0KCQiA5bz-BRD-ARIsABjT4ngHDf0ntlFE5pfEUfMPg9uFntPn-B-5SDp46ETU9RBjxn6cPgdyokIaAulcEALw_wcB'>
                                                <p key = {bday.birthday}>Send Flowers</p>
                                            </a>
                                        </div>
                                    </li>
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