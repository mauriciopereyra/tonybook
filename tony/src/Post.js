import './Post.css';
import React from 'react';
import PostHeader from './PostHeader';
import PostButtons from './PostButtons';
import PostImage from './PostImage';

class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = props.post
    };

    likePost = () => {
        this.setState({likes:this.state.likes+1})
    };

    render() {

      return (
        <div className="post">
            <PostHeader post={this.state}/>
            <div className="post_text">
                {this.state.content}
            </div>
            <PostImage media={this.state.media} />
            <div className="post_reactions">
                {this.state.likes} like this
            </div>
            <PostButtons likePost={this.likePost}/>
            <div className="post_comments">
                Comments list
            </div>
        </div>
      )
    }
}

export default Post;