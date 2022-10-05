import './Post.css';
import React from 'react';
import PostHeader from './PostHeader';
import PostButtons from './PostButtons';
import PostImage from './PostImage';
import PostReactions from './PostReactions';
import axios from 'axios'; 
import Comments_list from './Comments_list'
import { ipAddress } from './serverInfo';

class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            likes: [],
            comments: [],
        }
    };

    likePost = () => {
      console.log(this.props.post.pk)
        axios.post(`${ipAddress}/api/reactions/`, {
            user: this.props.loggedUser.pk, // !!!!!
            post: this.props.post.pk,
            type: 1
          })
          .then(function (response) {console.log(response);})
          .then(() => this.getLikes())
          .catch(function (error) {console.log(error);});
    };

    getLikes = () => {
            axios
            .get(`${ipAddress}/api/reactions/${this.props.post.pk}`)
            .then(res => this.setState({likes:res.data}))
            .then(() => this.checkLiked())
            .catch(err => console.log(err));
    }

    getComments = () => {
      axios
      .get(`${ipAddress}/api/posts/${this.props.post.pk}/comments`)
      .then(res => this.setState({comments:res.data}))
      .catch(err => console.log(err));
}

    componentDidMount() {
        this.getLikes()
        this.getComments()
      }

      media = () => {if(this.props.post.media){
        return <PostImage media={this.props.post.media} />
      }
    }

    render() {

      return (
        <div className="post" data-post-id={this.props.post.pk}>
            <div className='post_header'>
              <PostHeader post={this.props.post} user={this.props.user}  getPosts={this.props.getPosts} loggedUser={this.props.loggedUser}/>
              <div className="post_content">
                  {this.props.post.content}
              </div>
            </div>

            {this.media()}

            <div className='post_footer'>
              <PostReactions likes={this.state.likes} />
              <PostButtons likes={this.state.likes} likePost={this.likePost} checkLiked={this.checkLiked} loggedUser={this.props.loggedUser}/>
              <Comments_list post={this.props.post} loggedUser={this.props.loggedUser} comments={this.state.comments} getComments={this.getComments} user={this.props.user}  getUserFromId={this.props.getUserFromId}/>         
            </div>            
        </div>
      )
    }
}

export default Post;