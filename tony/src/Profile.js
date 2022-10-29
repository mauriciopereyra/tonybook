import React from 'react'
import './Profile.css'
import Avatar from './Avatar'
import ChangePicture from './ChangePicture'







class Profile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user: null
        }
    }





    isOwnProfile = (type) => {
        console.log(this.props)
        if (this.state.user.pk == this.props.loggedUser.pk) {
            return <ChangePicture key={1} user={this.state.user} type={type} loggedUser={this.props.loggedUser} getPosts={this.props.getPosts}/>
        }
    }


    getUserFromUrl = () => {
        const url = window.location.pathname;
        console.log(url)
        const profile = url.split("/tonybook/profile/")[1]
        const user_name = decodeURI(profile)
        return this.props.getUserFromName(user_name)
      }


    componentDidMount(){
        this.setState({user:this.getUserFromUrl()})
    }

    render (){
        if (this.state.user){
            return (
                <div className='profile'>
                    <div className='profile_cover' style={{
                        backgroundImage:`url(${this.state.user.cover})`
                    }}>
                    {this.isOwnProfile('cover')}
                    </div>
                    <div className='profile_title'>
                        <div className='profile_picture'>
                        {this.isOwnProfile('profile')}
                            <Avatar user={this.state.user} />
                        </div>
                        <div className='profile_name'>
                            {this.state.user.name}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Profile