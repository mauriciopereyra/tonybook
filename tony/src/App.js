import './App.css';
import PostsList from './PostsList.js'
import SelectUser from './SelectUser.js'
import CreatePost from './CreatePost.js'
import Profile from './Profile.js'
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

  getUserFromName = (name) => {
    console.log(this.state.users.length)
    for (let i = 0; i < this.state.users.length; i++) {
      console.log(this.state.users[i].name)
      if (this.state.users[i].name == name){
        console.log(this.state.users[i])
        return this.state.users[i]
      }
    }
}

getUserFromUrl = () => {
  const url = window.location.pathname;
  const profile = url.split("/profile/")[1]
  const user_name = decodeURI(profile)
  return this.getUserFromName(user_name)
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

isOwnProfile = () => {
  try {
    if (this.getUserFromUrl().pk == this.state.loggedUser.pk) {
      console.log("works now")
      return <CreatePost users={this.state.users} loggedUserId={this.state.loggedUserId} getPosts={this.getPosts} loggedUser={this.state.loggedUser} />
    }
  } catch (error) {
   console.log(error) 
  }
}

render() {
  return (
  <div className='wrapper'>
      <SelectUser users={this.state.users} loggedUserId={this.state.loggedUserId} changeUser={this.changeUser} />
      <Routes>
        <Route path="/" element={
          <CreatePost users={this.state.users} loggedUserId={this.state.loggedUserId} getPosts={this.getPosts} loggedUser={this.state.loggedUser} />
        } />

        <Route path={`/profile/:user`} element={
          <>
          <Profile user={this.getUserFromUrl()} loggedUser={this.state.loggedUser} getPosts={this.getPosts} />
          {this.isOwnProfile()}
          </>
        } />

      </Routes>
      
      <PostsList users={this.state.users} posts={this.state.posts} loggedUser={this.state.loggedUser} getPosts={this.getPosts} getUserFromId={this.getUserFromId}/>
  </div>
  );
}
}

export default App;
