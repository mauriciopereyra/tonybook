import React from 'react';

class UserInput extends React.Component {


    render(){
        return (
            <div className='content'>
            <div className='avatar' style={{
                    backgroundImage:`url(${this.props.setLoggedUser().avatar})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}>
            </div>
            <input name="user" type="hidden" value={this.props.loggedUserId}></input>
            <textarea name="content" placeholder='Whats on your mind'></textarea>
            </div>            
        )
    }

}

export default UserInput

