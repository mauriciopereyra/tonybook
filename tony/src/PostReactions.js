import React from 'react';
import './PostReactions.css'

class PostReactions extends React.Component {


likes = () => {
  let number_of_likes = this.props.likes.length
  let text = 'likes'
  if (number_of_likes == 1){text='like'}
  if (number_of_likes){
    return (<div className="post_reactions">
    {number_of_likes} {text}
  </div>)
  }

}

    render() {
      return this.likes()
    }
}

export default PostReactions;