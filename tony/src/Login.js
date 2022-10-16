import React from 'react';
import axios from 'axios'; 
import { ipAddress } from './serverInfo';
import './Login.css'

class App extends React.Component {
constructor(props){
  super(props)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.state = {
    status: null
  }
}


handleSubmit(event){
    event.preventDefault()
    const username = document.getElementsByName('username')[0].value.toLowerCase()
    const password = document.getElementsByName('password')[0].value
    axios({
        method: "post",
        url: `${ipAddress}/api/api-token-auth/`,
        data: {
            username:username,
            password:password},
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        console.log(res)
        document.cookie = "user_token=" + res.data.token + ";expires=" + new Date(new Date().getTime()+60*60*1000*24*30).toGMTString() + ";"
        let hasCookie = document.cookie.split(";").filter(cookie => cookie.includes("user_token"))
        if (hasCookie) { let user_token = hasCookie[0].split('user_token=')[1]}
        if (window.location.href.includes("/login")){
            window.location.href = "/";      
        }
    })
      .catch(err => this.setState({status:'Incorrect username or password'}))
}


render() {
  return (
    <div className='login'>
        <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <input required type="text" name="username" placeholder='Username'></input><br></br><br></br>
            <input required type="password" name="password" placeholder='Password'></input><br></br><br></br>
            <input type="submit" value="Login"></input>
        </form>
        <p>{this.state.status}</p>
    </div>
  );
}
}

export default App;
