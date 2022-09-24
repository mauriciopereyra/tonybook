import './CreatePost.css';
import React, { isValidElement } from 'react';
import axios from 'axios';


class CreatePost extends React.Component {
constructor(props){
  super(props)

}


handleSubmit = async(event) => {
  if(!document.getElementsByName('content')[0].value && document.getElementsByName('media')[0].files.length == 0){return false}
  

  const formData = new FormData();
  formData.append("user", this.props.loggedUserId);
  formData.append("content", document.getElementsByName('content')[0].value);
  formData.append("privacy", 'public');
  if(document.getElementsByName('media')[0].files.length){
    formData.append("media", document.getElementsByName('media')[0].files[0]);  
  }
  try {
    const response = await axios({
      method: "post",
      url: "http://192.168.1.107:8000/api/posts/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    document.getElementById('CreatePost').reset()
    document.getElementById('imagePreview').style.display = 'none'
    document.getElementById('imagePreview').src = ''
  } catch(error) {
    console.log(error)
  }
  setTimeout(this.props.getPosts,100)
}



// handleSubmit = (event) => {
//     event.preventDefault()
//     this.createPost()
//   };

handleClick(event) {
    event.preventDefault()
    document.getElementById('fileUpload').click()
  };

imagePreview(event){
    var fileUpload = document.getElementById("fileUpload")
    var imagePreview = document.getElementById("imagePreview")
    imagePreview.style.display = 'block'

    const [file] = fileUpload.files
    if (file) {
        imagePreview.src = URL.createObjectURL(file)
    }
}

setLoggedUser = () => {
    var loggedUser
      if(this.props.users.length){
        for (let i = 0; i < this.props.users.length; i++) {
          if (this.props.users[i].pk == this.props.loggedUserId){
            loggedUser = this.props.users[i]
          }
        }
        return loggedUser
      } else {
        return loggedUser = {pk: 1, user: 1, name: 'mauri 🇦🇷 🐈‍⬛', avatar: 'http://192.168.1.107:8000/media/djangounchained-leoblog630-jpg_225139_qlxhY4y.jpg'}
      }
    }



render() {

  return (
    <form id='CreatePost' onSubmit={this.handleSubmit}>
      <div className='content'>
        <div className='avatar' style={{
                backgroundImage:`url(${this.setLoggedUser().avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
        </div>
          <input name="user" type="hidden" value={this.props.loggedUserId}></input>
          <textarea name="content" placeholder='Whats on your mind'></textarea>
      </div>
        <img id="imagePreview" src='adas'></img>
        <label className='ImageLabel'>
            <input onChange={this.imagePreview} id='fileUpload' name='media' type="file" accept="image/*"/>
        </label>
        <div className='post_buttons'>
          <div className='button' onClick={this.handleClick}>Add picture</div>
          <div className='button' onClick={this.handleSubmit}>Post</div>
        </div>
    </form>
  );
}
}

CreatePost.defaultProps = {
    userLoggedId: 1,
    users: [],
  }

export default CreatePost;
