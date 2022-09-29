import React from 'react'
import './Comment.css'
import Avatar from './Avatar'
import UserName from './UserName'

class Comment extends React.Component {
    render(){
        return (
            <div className='comment'>
                <Avatar user={this.props.user} />
                <div className='comment_content'>
                    <UserName user={this.props.user} />
                    <p>{this.props.text}</p>
                </div> 
            </div>
        )
    }
}

export default Comment