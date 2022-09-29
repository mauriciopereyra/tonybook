import React from 'react'
import './Profile.css'
import Avatar from './Avatar'

class Profile extends React.Component {
    render (){
        if (this.props.user){
            return (
                <div className='profile'>
                    <div className='profile_cover' style={{
                        backgroundImage:`url(${this.props.user.cover})`
                    }}></div>
                    <div className='profile_title'>
                        <div className='profile_picture'>
                            <Avatar user={this.props.user} />
                        </div>
                        <div className='profile_name'>
                            {this.props.user.name}
                        </div>
                    </div>
                </div>
            )                
        }
    }
}

export default Profile