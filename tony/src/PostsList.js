import './PostsList.css';
import React from 'react';
import Post from './Post.js'

class PostsList extends React.Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    
    const posts_list = this.props.posts.map((post) => {
      return <Post key={post.pk} post={post} loggedUser={this.props.loggedUser} getPosts={this.props.getPosts} getUserFromId={this.props.getUserFromId}
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
        {posts_list}
      </div>
      )
    }
}

export default PostsList;