import './PostButtons.css';
import React from 'react';
import { comment, like } from './svg/icons';

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
            return <span><b className='flex-button'>{like} Liked</b></span>
        } else {
            // this.setState({liked:false})
            return <span className='flex-button'>{like} Like</span>
        }
    }

    userInLikes = (like) => {
        if(like.user == this.props.loggedUser.pk) {return true} // !!!!!
    }

    commentClick (el) {
        el.target.parentElement.parentElement.parentElement.getElementsByClassName("userInput")[0].getElementsByTagName("textarea")[0].focus()
    }

    

    render() {
        return (
        <div className="post_buttons">
            <div className='button' onClick={this.props.likePost}>
                <span> {this.checkLiked()}</span>
            </div>
            <div className='button' onClick={this.commentClick.bind(this)}>
                <span className='flex-button'>{comment} Comment</span>
            </div>
            {/* <div className='button'>
                Share
            </div> */}
        </div>
      )
    }
}

export default PostButtons;