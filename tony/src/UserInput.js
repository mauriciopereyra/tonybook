import React from 'react';
import './UserInput.css'
import Avatar from './Avatar'

class UserInput extends React.Component {

    render(){


        return (
            <div className='userInput'>
            <Avatar user={this.props.loggedUser} />
            <input name="user" type="hidden" value={this.props.loggedUser.pk}></input>
            <textarea name="content" placeholder={this.props.placeholder}></textarea>
            </div>            
        )
    }

}

export default UserInput

