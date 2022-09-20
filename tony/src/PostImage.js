import './PostImage.css';
import React from 'react';

class PostImage extends React.Component {

    render() {
      return (
        <div className="post_image">
            <img src={ this.props.media } alt="Post"></img>
        </div>
      )
    }
}

export default PostImage;