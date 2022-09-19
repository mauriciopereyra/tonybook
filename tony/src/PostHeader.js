import React from 'react';
import './PostHeader.css'

class PostHeader extends React.Component {
    render() {
      return (
        <div className='header'>
            <div className='avatar'></div>
            <div className='name_date_wrapper'>
                <div className='user'>Mauricio</div>
                <div className='date'>01/01/2022</div>
                <div className='privacy'>Public</div>
            </div> 
            <div className='settings'>==</div>
        </div>
      )
    }
}

export default PostHeader;