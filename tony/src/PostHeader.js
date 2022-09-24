import React from 'react';
import './PostHeader.css';
import axios from 'axios';

class PostHeader extends React.Component {

removePost = async() => {
  await axios
  .delete("http://192.168.1.107:8000/api/posts/"+this.props.post.pk)
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
      return (
        <div className='header'>
            <div className='avatar' style={{
              backgroundImage:`url(${this.props.user.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              }}></div>

            <div className='name_date_wrapper'>
                <div className='user'>{this.props.user.name}</div>
                <div className='date'>{this.props.post.date_posted}</div>
                {/* <div className='privacy'>{this.props.post.privacy}</div> */}
            </div> 
            <div className='settings'><button onClick={this.removePostConfirm}>X</button></div>
        </div>
      )
    }
}

export default PostHeader;