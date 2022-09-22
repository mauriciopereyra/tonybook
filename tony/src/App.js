import './App.css';
import PostsList from './PostsList.js'
import SelectUser from './SelectUser.js'
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
  .then(() => console.log(this.state.users))
  .catch(err => console.log(err));

}



render() {

  return (
  <div className='wrapper'>
      <><h1>Logged user is {this.state.loggedUserId}</h1></>
      <><SelectUser users={this.state.users} loggedUserId={this.state.loggedUserId} changeUser={this.changeUser}/></>
      <><PostsList users={this.state.users} posts={this.state.posts} loggedUserId={this.state.loggedUserId}/></>
  </div>
  );
}
}

export default App;
