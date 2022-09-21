import './PostsList.css';
import React from 'react';
import Post from './Post.js'

class PostsList extends React.Component {


  render() {

    const posts_list = this.props.posts.map((post) => {
      return <Post key={post.pk} post={post}  
      user={
        this.props.users.find(function (x) {
          return x.pk === post.user;
      })
    }     
      />
    }
    )
  

      return (
    <div className="posts_list">
      <h1>{this.props.loggedUserId}</h1>
        {posts_list}
      </div>
      )
    }
}

export default PostsList;