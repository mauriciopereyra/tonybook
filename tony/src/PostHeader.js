import React from 'react';
import './PostHeader.css';
import axios from 'axios';
import Avatar from './Avatar'
import UserName from './UserName'
import { ipAddress } from './serverInfo';
import { axiosConfig } from './getCookie';

class PostHeader extends React.Component {

removePost = async() => {
  await axios
  .delete(`${ipAddress}/api/posts/${this.props.post.pk}`,axiosConfig)
  .then(res => this.setState({likes:res.data}))
  .catch(err => console.log(err));
  this.props.getPosts()
}

removePostConfirm = () => {
  let confirmation = window.confirm("Are you sure you want to remove this post?")
  if (confirmation){
    this.removePost()
  }
}



    render() {

      const removePostButton = () => {
        if (this.props.loggedUser.pk == this.props.user.pk){
          return <div className='settings'><button onClick={this.removePostConfirm}>X</button></div>
        }
      }

      return (
        <div className='top_row'>
            <Avatar user={this.props.user} />
            <div className='name_date_wrapper'>
                <UserName user={this.props.user} />
                <div className='date'>{this.props.post.date_posted}</div>
                {/* <div className='privacy'>{this.props.post.privacy}</div> */}
            </div> 
            {removePostButton()}
        </div>
      )
    }
}

export default PostHeader;