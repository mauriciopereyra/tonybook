import React from 'react';
import './PostHeader.css'

class PostHeader extends React.Component {
    render() {
      return (
        <div className='header'>
            <div className='avatar' style={{
              backgroundImage:`url(${this.props.user.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              }}></div>

            <div className='name_date_wrapper'>
                <div className='user'>{this.props.user.name}</div>
                <div className='date'>{this.props.post.date_posted}</div>
                <div className='privacy'>{this.props.post.privacy}</div>
            </div> 
            <div className='settings'>==</div>
        </div>
      )
    }
}

export default PostHeader;