import './Post.css';
import React from 'react';
import PostHeader from './PostHeader';
import img from './assets/images/logo192.png'
import PostButtons from './PostButtons';

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
            <div className="post_image">
                <img src={img} alt="Post"></img>
            </div>
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