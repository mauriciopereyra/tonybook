import React from 'react'
import './Profile.css'
import Avatar from './Avatar'
import ChangePicture from './ChangePicture'

class Profile extends React.Component {
    isOwnProfile = (type) => {
        if (this.props.user.pk == this.props.loggedUser.pk) {
            return <ChangePicture key={1} user={this.props.user} type={type} loggedUser={this.props.loggedUser} getPosts={this.props.getPosts}/>
        }
    }

    render (){
        if (this.props.user){
            return (
                <div className='profile'>
                    <div className='profile_cover' style={{
                        backgroundImage:`url(${this.props.user.cover})`
                    }}>
                    {this.isOwnProfile('cover')}
                    </div>
                    <div className='profile_title'>
                        <div className='profile_picture'>
                        {this.isOwnProfile('profile')}
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