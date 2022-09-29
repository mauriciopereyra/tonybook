import React from 'react'
import './UserName.css'

class UserName extends React.Component {
    render(){
        return (
            <a className='user' href={`/profile/${this.props.user.name}`}>
                <div className='user'>{this.props.user.name}</div>
            </a>
        )
    }
}

export default UserName