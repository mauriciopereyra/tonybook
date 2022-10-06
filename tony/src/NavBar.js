import React from 'react';
import './NavBar.css'
import Avatar from './Avatar';
import Notifications from './Notifications';

class NavBar extends React.Component {
constructor(props){
  super(props)
}

checkUserIsLogged = () => {
    if(this.props.loggedUser !== null) {
        return true
    } else {
        return false
    }
}

profileLink = () => {
    if (this.checkUserIsLogged() && this.props.loggedUser) {
        // return <Avatar user={this.props.loggedUser} />
        return (
          <div className='avatar_and_name'>
          <Avatar user={this.props.loggedUser}></Avatar>
          <a href={`/profile/${this.props.loggedUser.name}`} className='profile_link'>{this.props.loggedUser.name}</a>
          </div>
        )
    } else {
        return <div className='avatar_and_name'></div>
    }
}
       


render() {
  return (
    <div className='navBar'>
            {this.profileLink()}
            <a className='navbar_title' href="/">Tonybook</a>
            <Notifications loggedUser={this.props.loggedUser}></Notifications>
    </div>
  );
}
}

export default NavBar;
