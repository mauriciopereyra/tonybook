import './PostsList.css';
import React from 'react';
import Post from './Post.js'

class PostsList extends React.Component {


  render() {

    const posts_list = this.props.posts.map((post) => {
      return <Post key={post.pk} post={post}  
      user={
        this.props.users.find(function (x) {
          return x.id === post.user.pk;
      })
    }     
      />
    }
    )
    
      return (
    <div className="posts_list">
        {posts_list}
      </div>
      )
    }
}

export default PostsList;