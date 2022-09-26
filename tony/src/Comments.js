import React from 'react'
import ReactDOM from 'react-dom'
import './Comments.css'
import UserInput from './UserInput';
import axios from 'axios';

class Comments extends React.Component {

    postComment = (content) => {
        console.log(this.props.post.pk)
          axios.post(`http://192.168.1.107:8000/api/posts/${this.props.post.pk}/comments`, {
              user: this.props.loggedUser.pk,
              post: this.props.post.pk,
              content: content,
            })
            .then(function (response) {})
            .catch(function (error) {});
      };

    newCommentBinding = () => {
        let new_comment = document.querySelector(`[data-post-id="${this.props.post.pk}"]`).getElementsByClassName('userInput')[0].getElementsByTagName('textarea')[0]
        new_comment
        .addEventListener('keyup', function(event) {
            if (event.key === 'Enter')
            {
                if (new_comment.value.trim() != "\n" && new_comment.value.trim() != ""){
                    this.postComment(new_comment.value)
                }
                new_comment.value = ""
            }
        }.bind(this));
    }


    componentDidMount(){
        this.newCommentBinding(this)
    }

    render(){
        return (
            <form className='post_comments'>
                <UserInput loggedUser={this.props.loggedUser} placeholder='Write a comment'/>
            </form>
        )
    }
}


export default Comments