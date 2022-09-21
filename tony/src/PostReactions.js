import React from 'react';
import './PostReactions.css'

class PostReactions extends React.Component {

    render() {
      return (
        <div className="post_reactions">
            {this.props.likes.length} like this
        </div>
      )
    }
}

export default PostReactions;