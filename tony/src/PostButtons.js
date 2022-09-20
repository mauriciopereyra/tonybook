import './PostButtons.css';
import React from 'react';

class PostButtons extends React.Component {

    render() {
      return (
        <div className="post_buttons">
            <button onClick={this.props.likePost}>
                Like
            </button>
            <button>
                Comment
            </button>
            <button>
                Share
            </button>
        </div>
      )
    }
}

export default PostButtons;