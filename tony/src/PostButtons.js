import './PostButtons.css';
import React from 'react';

class PostButtons extends React.Component {

    constructor(props){
        super(props)
        this.state = {liked:false}
    }

    setLiked(){
        if (this.state.liked === true){
            return 
        } else {
            return 
        }
    }


    checkLiked = () => {
        if (this.props.likes.filter(this.userInLikes).length){
            // this.setState({liked:true})
            return <b>Liked</b>
        } else {
            // this.setState({liked:false})
            return "Like"
        }
    }

    userInLikes = (like) => {
        if(like.user == this.props.loggedUser.pk) {return true} // !!!!!
    }

    

    render() {
        return (
        <div className="post_buttons">
            <div className='button' onClick={this.props.likePost}>
                {this.checkLiked()}
            </div>
            <div className='button'>
                Comment
            </div>
            <div className='button'>
                Share
            </div>
        </div>
      )
    }
}

export default PostButtons;