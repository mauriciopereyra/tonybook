import './Post.css';
import React from 'react';
import PostHeader from './PostHeader';
import PostButtons from './PostButtons';
import PostImage from './PostImage';
import PostReactions from './PostReactions';
import axios from 'axios'; 

class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post: props.post,
            likes: [],
            liked: false,
            user: props.user,
        }
    };

    likePost = () => {
        axios.post('http://192.168.1.107:8000/api/reactions/', {
            user: 1, // !!!!!
            post: this.props.post.pk,
            type: 1
          })
          .then(function (response) {console.log(response);})
          .catch(function (error) {console.log(error);});
          setTimeout(this.getLikes,100)
          
    };

    getLikes = () => {
            axios
            .get("http://192.168.1.107:8000/api/reactions/"+this.state.post.pk)
            .then(res => this.setState({likes:res.data}))
            .catch(err => console.log(err));
            setTimeout(this.checkLiked,100)
    }

    checkLiked = () => {
        if (this.state.likes.filter(this.userInLikes).length){
            this.setState({liked:true})
        } else {
            this.setState({liked:false})
        }
    }

    userInLikes = (like) => {
        if(like.user === 1) {return true} // !!!!!
    }

    componentDidMount() {
        this.getLikes()
      }

    render() {

      return (
        <div className="post">
            <PostHeader post={this.state.post} user={this.props.user}/>
            <div className="post_content">
                {this.state.post.content}
            </div>
            <PostImage media={this.state.post.media} />
            <PostReactions likes={this.state.likes} />
            <PostButtons likePost={this.likePost} liked={this.state.liked}/>
            <div className="post_comments">
                Comments list
            </div>
        </div>
      )
    }
}

export default Post;