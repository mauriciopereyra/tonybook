import React from 'react'
import { Link } from 'react-router-dom'
import './UserName.css'

class UserName extends React.Component {
    render(){
        return (
            <Link className='user' to={`/profile/${this.props.user.name}`}>
                <div className='user'>{this.props.user.name}</div>
            </Link>
        )
    }
}

export default UserName