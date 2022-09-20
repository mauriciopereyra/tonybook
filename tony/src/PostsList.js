import './PostsList.css';
import React from 'react';
import Post from './Post.js'
import axios from 'axios'; 

class PostsList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        posts:[]
      }
    }

    componentDidMount() {
      axios
      .get("http://127.0.0.1:8000/api/posts/")
      .then(res => this.setState({posts:res.data}))
      .catch(err => console.log(err));
    }
  
  
  render() {
    const posts_list = this.state.posts.map((post) => {
      return <Post key={post.pk} post={post} />
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