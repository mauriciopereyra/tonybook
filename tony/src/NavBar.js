import React from 'react';
import './NavBar.css'
import Avatar from './Avatar';

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
        return <a href={`/profile/${this.props.loggedUser.name}`} className='profile_link'>{this.props.loggedUser.name}</a>
    } else {
        return <a className='profile_link'></a>
    }
}

render() {
  return (
    <div className='navBar'>
            {this.profileLink()}
            <a className='navbar_title' href="/">Tonybook</a>
            <a className='notifications'></a>
    </div>
  );
}
}

export default NavBar;
