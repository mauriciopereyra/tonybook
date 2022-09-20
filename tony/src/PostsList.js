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
          content:'this is my content'
        },
        {
          id:1,
          user:'oum',
          content:'more content'
        }
        ]
      }
    }
  
  
  render() {
    const posts_element = this.state.posts.map((post) => {
      return <Post key={post.id} user={post.user} content={post.content} />
    }
    )
    
      return (
    <div className="posts_list">
        <h1>
          Posts list
        </h1>
        {posts_element}
      </div>
      )
    }
}

export default PostsList;