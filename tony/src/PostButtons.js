import './PostButtons.css';
import React from 'react';

class PostButtons extends React.Component {

    setLiked(){
        if (this.props.liked === true){
            return <b>Liked</b>
        } else {
            return "Like"
        }
    }

    render() {

        return (
        <div className="post_buttons">
            <button onClick={this.props.likePost}>
                {this.setLiked()}
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