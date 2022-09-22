import './App.css';
import PostsList from './PostsList.js'
import SelectUser from './SelectUser.js'
import CreatePost from './CreatePost.js'
import React from 'react';
import axios from 'axios'; 


class App extends React.Component {
constructor(props){
  super(props)
  this.state = {loggedUserId:1,posts:[],users:[]}
}

changeUser = (pk) => {
  if (this.state.users){
      this.setState({loggedUserId:pk})
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
  .catch(err => console.log(err));

}


getLoggedUser = () => {
  if (this.state.users){
      this.state.users.find(function (x) {
        return x.pk == this.state.loggedUserId;
    })
  }
}

render() {
  // console.log(this.getLoggedUser())
  return (
  <div className='wrapper'>
      <><SelectUser users={this.state.users} loggedUserId={this.state.loggedUserId} changeUser={this.changeUser}/></>
      <><CreatePost loggedUserId={this.state.loggedUserId}/></>
      <><PostsList users={this.state.users} posts={this.state.posts} loggedUserId={this.state.loggedUserId}/></>
  </div>
  );
}
}

export default App;
