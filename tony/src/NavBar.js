import React from 'react';
import './NavBar.css'
import Avatar from './Avatar';
import Notifications from './Notifications';
import { Link } from 'react-router-dom';

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
          <Link 
          className='profile_link' 
          to={`profile/${this.props.loggedUser.name}`}>
            {this.props.loggedUser.name}
          </Link>
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
            <Link className='navbar_title' to="/">Tonybook</Link>
            <Notifications loggedUser={this.props.loggedUser}></Notifications>
    </div>
  );
}
}

export default NavBar;
