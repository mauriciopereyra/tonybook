import React from 'react'
import './Comments_list.css'
import UserInput from './UserInput';
import axios from 'axios';
import Comment from './Comment'
import { ipAddress } from './serverInfo';


class Comments_list extends React.Component {
    constructor(props){
        super(props)
        this.renderCommentsList = this.renderCommentsList.bind(this);
    }

    postComment = (content) => {
        console.log(this.props.post.pk)
          axios.post(`${ipAddress}/api/posts/${this.props.post.pk}/comments`, {
              user: this.props.loggedUser.pk,
              post: this.props.post.pk,
              content: content,
            })
            .then(() => {this.props.getComments()})
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

    renderCommentsList(comment){
        return <Comment text={comment.content} key={comment.pk} user={this.props.getUserFromId(comment.user)}/>
    }
    

    render(){
        var comments_list = this.props.comments.map(this.renderCommentsList)

        return (
            <form className='post_comments'>
                {comments_list}
                <UserInput loggedUser={this.props.loggedUser} placeholder='Write a comment'/>
            </form>
        )
    }
}


export default Comments_list