import React from 'react'

const Friend = (props) => {
    const {friend} = props;
    return (
        <li key={friend.id}><a href={`#${friend.id}`}>{friend.name}</a></li>
    )
}

export default  Friend