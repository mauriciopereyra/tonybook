import React from 'react'
import './Comment.css'

class Comment extends React.Component {
    render(){
        return (
            <div className='comment'>
                <div className='avatar' style={{backgroundImage:`url(${this.props.user.avatar})`}}></div>
                <div className='comment_content'>
                    <div className='user'>{this.props.user.name}</div>
                    <p>{this.props.text}</p>
                </div> 
            </div>
        )
    }
}

export default Comment