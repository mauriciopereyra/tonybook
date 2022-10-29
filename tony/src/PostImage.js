import './PostImage.css';
import React from 'react';
import { Link } from 'react-router-dom';

class PostImage extends React.Component {

    render() {
      return (
        <Link to={`/posts/${this.props.pk}`}>
          <div className="post_image">
              <img src={ this.props.media } alt="Post"></img>
          </div>
        </Link>
      )
    }
}

export default PostImage;