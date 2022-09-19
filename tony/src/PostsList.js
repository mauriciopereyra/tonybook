import './PostsList.css';
import React from 'react';
import Post from './Post.js'

class PostsList extends React.Component {
    render() {
      return (
    <div className="posts_list">
        <h1>
          Posts list
        </h1>
        <Post />
        <Post />
      </div>
      )
    }
}

export default PostsList;