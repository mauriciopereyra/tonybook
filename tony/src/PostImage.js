import './PostImage.css';
import React from 'react';

class PostImage extends React.Component {

    render() {
      return (
        <a href={`/posts/${this.props.pk}`}>
          <div className="post_image">
              <img src={ this.props.media } alt="Post"></img>
          </div>
        </a>
      )
    }
}

export default PostImage;