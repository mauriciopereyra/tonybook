import React from 'react'
import './Avatar.css'

class Avatar extends React.Component {
    render(){
        return (
            <a href={`/profile/${this.props.user.name}`}>
            <div className='avatar' style={{
                backgroundColor: 'white',
                backgroundImage:`url(${this.props.user.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}></div>
            </a>
        )
    }
}

export default Avatar