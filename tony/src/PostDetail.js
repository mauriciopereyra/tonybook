import React from 'react';
import Post from './Post.js'
import axios from 'axios'
import { ipAddress } from './serverInfo.js';
import './PostDetail.css'

class PostDetail extends React.Component {

    constructor(props){
        super(props)
        this.state = {post:null}
        this.createElement = this.createElement.bind(this)
    }


    getPost = async () => {
        const post_id = window.location.href.split("/posts/")[1]
        await axios
        .get(`${ipAddress}/api/posts/${post_id}`)
        .then(res => this.setState({post:res.data}))
        .catch(err => window.location.href = "/");   
    }

            
    createElement () {
        var post_elem = ''
        if (this.state.post){
            const this_user = this.state.post.user
            post_elem = <Post key={this.state.post.pk} post={this.state.post} loggedUser={this.props.loggedUser} getPosts={this.props.getPosts} getUserFromId={this.props.getUserFromId}
            user={
              this.props.users.find(function (x) {
                return x.pk === this_user;
            })}/>
        }
        return post_elem
    }




    componentDidMount(){
        this.getPost()
    }


  render() {

        return <div className='post_detail'>{this.createElement()}</div>

    }
}

export default PostDetail;