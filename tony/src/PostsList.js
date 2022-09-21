import './PostsList.css';
import React from 'react';
import Post from './Post.js'
import axios from 'axios'; 

class PostsList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        posts:[],
        users:props.users,
      }
    }

    componentDidMount() {
      axios
      .get("http://192.168.1.107:8000/api/posts/")
      .then(res => this.setState({posts:res.data}))
      .catch(err => console.log(err));

      axios
      .get("http://192.168.1.107:8000/api/users/")
      .then(res => this.setState({users:res.data}))
      .then(() => console.log(this.state.users))
      .catch(err => console.log(err));

    }

  render() {

    const posts_list = this.state.posts.map((post) => {
      return <Post key={post.pk} post={post}  
      user={
        this.state.users.find(function (x) {
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