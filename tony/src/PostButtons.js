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
        if(like.user == this.props.loggedUserId) {return true} // !!!!!
    }

    

    render() {
        return (
        <div className="post_buttons">
            <button onClick={this.props.likePost}>
                {this.checkLiked()}
            </button>
            <button>
                Comment
            </button>
            <button>
                Share
            </button>
        </div>
      )
    }
}

export default PostButtons;