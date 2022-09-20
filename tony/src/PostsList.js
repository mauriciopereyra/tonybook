import './PostsList.css';
import React from 'react';
import Post from './Post.js'

class PostsList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        posts:[
          {
          id:0,
          user:'mauricio',
          content:'this is my content',
          date_posted:'01/05/2022',
          privacy:'Friends',
          likes:3,
        },
        {
          id:1,
          user:'oum',
          content:'more content',
          date_posted:'15/08/2022',
          privacy:'Public',
          likes:5,
        }
        ]
      }
    }
  
  
  render() {
    const posts_list = this.state.posts.map((post) => {
      return <Post key={post.id} post={post} />
    }
    )
    
      return (
    <div className="posts_list">
        <h1>
          Posts list
        </h1>
        {posts_list}
      </div>
      )
    }
}

export default PostsList;