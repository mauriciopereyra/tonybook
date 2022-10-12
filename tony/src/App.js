import './App.css';
import PostsList from './PostsList.js'
import SelectUser from './SelectUser.js'
import Post from './Post';
import CreatePost from './CreatePost.js'
import Profile from './Profile.js'
import Login from './Login.js'
import React from 'react';
import axios from 'axios'; 
import { Routes, Route } from "react-router-dom"
import { ipAddress } from './serverInfo';
import NavBar from './NavBar';
import PostDetail from './PostDetail';
import { connect } from 'react-redux'

import { useNavigate } from 'react-router';

const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    } 
    return Wrapper;
}

const mapStateToProps = state => {
  return {
    loggedUserId:state.loggedUserId,
    posts:state.posts,
    users:state.users,
    loggedUser:state.loggedUser,
    page:state.page,
  }
}

class App extends React.Component {
constructor(props){
  super(props)


  this.state = {
    loggedUserId:null,posts:[],users:[],
    loggedUser:null,
    page:1,
  }

  this.getUsers = () => {
    return new Promise((resolve,reject) =>
    {
      axios
      .get(`${ipAddress}/api/users/`)
      .then(res => {this.setState({users:res.data});resolve()})
      // .catch(err => {console.log(err);reject()});
    })
  }

  this.getUsers()
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
      return this.state.loggedUser
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
    // console.log(this.state.users.length)
    for (let i = 0; i < this.state.users.length; i++) {
      // console.log(this.state.users[i].name)
      if (this.state.users[i].name == name){
        // console.log(this.state.users[i])
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
    .get(`${ipAddress}/api/posts?page=${this.state.page}`)
    .then(res => this.setState({posts:res.data,page:this.state.page+1}))
    .catch(err => console.log(err));    
  } else {
    axios
    .get(`${ipAddress}/api/posts/user/${user_name}?page=${this.state.page}`)
    .then(res => this.setState({posts:res.data,page:this.state.page+1}))
    .catch(err => console.log(err));      
  }

}


getUserFromToken = async () => {
  let hasCookie = document.cookie.split(";").filter(cookie => cookie.includes("user_token"))
  if (hasCookie.length > 0) { 
    var token = hasCookie[0].split('user_token=')[1]
  } else {
    return false
  }
  return await axios.get(`${ipAddress}/api/user_from_token/${token}`)
}

setUserFromToken = (user) => {
  if(user){
    this.setState({
      loggedUser : user.data,
      loggedUserId : user.data.pk
    })
  } else {
    if (!window.location.href.includes("/login")){
      window.location.href = "/login";      
    }
  }
}

loadMore = () => {
  // document.getElementsByClassName("navbar_title")[0].innerHTML = `wIH= ${window.innerHeight} dST= ${document.documentElement.scrollTop} dSESH= ${document.scrollingElement.scrollHeight}`

  if (window.innerHeight + document.documentElement.scrollTop > document.scrollingElement.scrollHeight - 100) {
  // document.getElementsByClassName("navbar_title")[0].innerHTML = "Getting more posts" 
     this.getPosts()
  }
}

componentDidMount() {

  const onMount = async() => {
    const user = await this.getUserFromToken()
    this.setUserFromToken(user)
    await this.getUsers()
    this.setLoggedUser()
    this.getPosts()
    window.addEventListener('scroll',this.loadMore)
  }
  onMount()
}

componentWillUnmount(){
  window.removeEventListener('scroll',this.loadMore)
}

isOwnProfile = () => {
  try {
    if (this.getUserFromUrl().pk == this.state.loggedUser.pk) {
      return <CreatePost users={this.state.users} loggedUserId={this.state.loggedUserId} getPosts={this.getPosts} loggedUser={this.state.loggedUser} />
    }
  } catch (error) {
  }
}

render() {
  return (
  <>
  <NavBar loggedUser={this.state.loggedUser}></NavBar>
  <div className='wrapper'>
      {/* {this.state.loggedUser ? <SelectUser users={this.state.users} loggedUserId={this.state.loggedUserId} changeUser={this.changeUser} /> : ""} */}
      <Routes>
        {/* Need to fix this, path should be / and not "*" */}
        <Route path="*" element={
          <>
          {this.state.loggedUser ? <CreatePost users={this.state.users} loggedUserId={this.state.loggedUserId} getPosts={this.getPosts} loggedUser={this.state.loggedUser} /> : ""}
          {this.state.loggedUser ? <PostsList users={this.state.users} posts={this.state.posts} loggedUser={this.state.loggedUser} getPosts={this.getPosts} getUserFromId={this.getUserFromId}/> : ""}
          </>
        } />

        <Route path="/login" element={
          <Login />
    } />

        <Route path={`/posts/:post_id`} element={
          this.state.loggedUser ? <PostDetail users={this.state.users} posts={this.state.posts} loggedUser={this.state.loggedUser} getPosts={this.getPosts} getUserFromId={this.getUserFromId}/> : ""
      } />

        <Route path={`/profile/:user`} element={
          <>
          {this.state.loggedUser ? <Profile user={this.getUserFromUrl()} loggedUser={this.state.loggedUser} getPosts={this.getPosts} /> : "" }
          {this.state.loggedUser ? this.isOwnProfile() : "" }
          {this.state.loggedUser ? <PostsList users={this.state.users} posts={this.state.posts} loggedUser={this.state.loggedUser} getPosts={this.getPosts} getUserFromId={this.getUserFromId}/> : "" }
          </>
        } />

      </Routes>
      
  </div>
  </>
  );
}
}

export default App
// export default withRouter(connect(mapStateToProps)(App));
