import './CreatePost.css';
import React, { isValidElement } from 'react';


class CreatePost extends React.Component {
constructor(props){
  super(props)
}

handleSubmit(event) {
    event.preventDefault()

  };

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

render() {

  return (
    <form id='CreatePost' onSubmit={this.handleSubmit}>
        <input name="user" type="hidden" value={this.props.loggedUserId}></input>
        <textarea name="content" placeholder='Whats on your mind'></textarea>
        <img id="imagePreview" src='adas'></img>
        <label className='ImageLabel'>
            <button onClick={this.handleClick}>Add picture</button>
            <input onChange={this.imagePreview} id='fileUpload' name='media' type="file" accept="image/*"/>
        </label>
        <input type="submit" value="Post"></input>
    </form>
  );
}
}

export default CreatePost;
