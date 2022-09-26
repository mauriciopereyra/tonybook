import React from 'react';
import './UserInput.css'

class UserInput extends React.Component {



    render(){


        return (
            <div className='userInput'>
            <div className='avatar' style={{
                    backgroundImage:`url(${this.props.loggedUser.avatar})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}>
            </div>
            <input name="user" type="hidden" value={this.props.loggedUser.pk}></input>
            <textarea name="content" placeholder={this.props.placeholder}></textarea>
            </div>            
        )
    }

}

export default UserInput

