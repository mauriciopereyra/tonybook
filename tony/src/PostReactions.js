import React from 'react';
import './PostReactions.css'
import { like } from './svg/icons';

class PostReactions extends React.Component {


likes = () => {
  let number_of_likes = this.props.likes.length
  let text = 'likes'
  if (number_of_likes == 1){text='like'}
  if (number_of_likes){
    return (<div className="post_reactions">
    {like} <span>{number_of_likes}</span> 
    {/* <span>{text}</span>  */}
  </div>)
  }

}

    render() {
      return this.likes()
    }
}

export default PostReactions;