import './Post.css';
import React from 'react';
import PostHeader from './PostHeader';

class Post extends React.Component {
    render() {
      return (
        <div className="post">
            <PostHeader user={this.props.user}/>
            <div className="post_text">
                {this.props.content}
            </div>
            <div className="post_image">
                Post IMG
            </div>
            <div className="post_reactions">
                Oum and 7 others like this
            </div>
            <div className="post_buttons">
                Like | Comment | Share
            </div>
            <div className="post_comments">
                Comments list
            </div>
        </div>
      )
    }
}

export default Post;