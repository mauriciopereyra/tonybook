import React from 'react';
import axios from 'axios'; 
import { ipAddress } from './serverInfo';

class App extends React.Component {
constructor(props){
  super(props)
  this.handleSubmit = this.handleSubmit.bind(this)
}


handleSubmit(event){
    event.preventDefault()
    const username = document.getElementsByName('username')[0].value
    const password = document.getElementsByName('password')[0].value
    axios({
        method: "post",
        url: `${ipAddress}/api/api-token-auth/`,
        data: {
            username:"mauricio",
            password:"14Henry!"},
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
}





render() {
  return (
    <div className='login'>
        <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <input required type="text" name="username" placeholder='Username'></input>
            <input required type="password" name="password" placeholder='Password'></input>
            <input type="submit" value="Login"></input>
        </form>
        <h3>Login response</h3>
        <p>Sample</p>
    </div>
  );
}
}

export default App;
