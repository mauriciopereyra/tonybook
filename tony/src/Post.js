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
            likes: [],
        }
    };

    likePost = () => {
      console.log(this.props.post.pk)
        axios.post('http://192.168.1.107:8000/api/reactions/', {
            user: this.props.loggedUserId, // !!!!!
            post: this.props.post.pk,
            type: 1
          })
          .then(function (response) {console.log(response);})
          .catch(function (error) {console.log(error);});
          setTimeout(this.getLikes,100)
    };

    getLikes = () => {
            axios
            .get("http://192.168.1.107:8000/api/reactions/"+this.props.post.pk)
            .then(res => this.setState({likes:res.data}))
            .catch(err => console.log(err));
            setTimeout(this.checkLiked,100)
    }



    componentDidMount() {
        this.getLikes()

      }

      media = () => {if(this.props.post.media){
        return <PostImage media={this.props.post.media} />
      }
    }

    render() {

      return (
        <div className="post">
            <PostHeader post={this.props.post} user={this.props.user}/>
            <div className="post_content">
                {this.props.post.content}
            </div>
            {this.media()}
            {/* <PostImage media={this.props.post.media} /> */}
            
            <PostReactions likes={this.state.likes} />
            <PostButtons likes={this.state.likes} likePost={this.likePost} checkLiked={this.checkLiked} loggedUserId={this.props.loggedUserId}/>
            <div className="post_comments">
                Comments list
            </div>
        </div>
      )
    }
}

export default Post;