import React from 'react'
import { Link } from 'react-router-dom'
import './Avatar.css'

class Avatar extends React.Component {
    render(){
        return (
            <Link to={`/profile/${this.props.user.name}`}>
            <div className='avatar' style={{
                backgroundColor: 'white',
                backgroundImage:`url(${this.props.user.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}></div>
            </Link>
        )
    }
}

export default Avatar