import './App.css';
import PostsList from './PostsList.js'
import SelectUser from './SelectUser.js'
import CreatePost from './CreatePost.js'
import React from 'react';
import axios from 'axios'; 
import { Routes, Route } from "react-router-dom"


class App extends React.Component {
constructor(props){
  super(props)
  this.state = {loggedUserId:1,posts:[],users:[],
    loggedUser:{pk: 1, user: 1, name: 'mauri 🇦🇷 🐈‍⬛', avatar: 'http://192.168.1.107:8000/media/djangounchained-leoblog630-jpg_225139_qlxhY4y.jpg'}
  }
}


setLoggedUser = () => {
  var loggedUser
    if(this.state.users.length){
      for (let i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].pk == this.state.loggedUserId){
          loggedUser = this.state.users[i]
        }
      }
      this.setState({loggedUser:loggedUser})
      return loggedUser
    } 
  }

  getUserFromId = (pk) => {
      for (let i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].pk == pk){
          return this.state.users[i]
        }
      }
  }


changeUser = (pk) => {

  if (this.state.users){
      new Promise((resolve, reject) => {
        this.setState({loggedUserId:pk})
        resolve();
      })
      .then(() => {this.setLoggedUser()})      
  }
}

getPosts = () => {
  const url = window.location.pathname;
  const profile = url.split("/profile/")[1]
  const user_name = decodeURI(profile)

  // Get all posts
  if(!user_name){
    axios
    .get(`http://192.168.1.107:8000/api/posts/`)
    .then(res => this.setState({posts:res.data}))
    .catch(err => console.log(err));    
  } else {
    axios
    .get(`http://192.168.1.107:8000/api/posts/user/${user_name}`)
    .then(res => this.setState({posts:res.data}))
    .catch(err => console.log(err));      
  }

}

getUsers = () => {
  return new Promise((resolve,reject) =>
  {
    axios
    .get("http://192.168.1.107:8000/api/users/")
    .then(res => {this.setState({users:res.data});resolve()})
    .catch(err => {console.log(err);reject()});
  })
}

componentDidMount() {
  const onMount = async() => {
    await this.getUsers()
    this.setLoggedUser()
    this.getPosts()
  }
  onMount()
}


render() {
  return (
  <div className='wrapper'>
      <Routes>
        <Route path="/" element={
          <>
          <SelectUser users={this.state.users} loggedUserId={this.state.loggedUserId} changeUser={this.changeUser} />
          <CreatePost users={this.state.users} loggedUserId={this.state.loggedUserId} getPosts={this.getPosts} loggedUser={this.state.loggedUser} />
          <PostsList users={this.state.users} posts={this.state.posts} loggedUser={this.state.loggedUser} getPosts={this.getPosts} getUserFromId={this.getUserFromId}/>
          </>
        } />

        <Route path={`/profile/:user`} element={
          <PostsList users={this.state.users} posts={this.state.posts} loggedUser={this.state.loggedUser} getPosts={this.getPosts} getUserFromId={this.getUserFromId}/>
        } />


      </Routes>
  </div>
  );
}
}

export default App;
