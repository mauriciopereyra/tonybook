import './ChangePicture.css'
import React from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

class ChangePicture extends React.Component {
    constructor(props){
        super(props)
        this.state = {toggledOpen:false}

    }

    ToggleButtons = () => {
        this.setState(prevState => {return {toggledOpen: !prevState.toggledOpen} });
    }

    ClickUploadPictureHandle = (event) => {
        event.target.parentElement.getElementsByTagName("input")[0].click()
    }

    ClickCancelPictureHandle = (event) => {
        var backgroundElement

        if (this.props.type == 'profile'){
            backgroundElement = event.target.parentElement.parentElement.getElementsByClassName("avatar")[0]; 
        } else {
            backgroundElement = event.target.parentElement.parentElement; 
        }

        event.target.parentElement.getElementsByTagName('form')[0].reset()

        if (this.props.type == 'profile'){
            backgroundElement.style.backgroundImage = `url(${this.props.user.avatar})`
        } else {
            backgroundElement.style.backgroundImage = `url(${this.props.user.cover})`
        }
        this.setState({toggledOpen:false})
    }

    ClickSavePictureHandle = async (event) => {
        var backgroundElement
        if (this.props.type == 'profile'){
            backgroundElement = event.target.parentElement.parentElement.getElementsByClassName("avatar")[0]; 
        } else {
            backgroundElement = event.target.parentElement.parentElement; 
        }

        const updateUser = new FormData();
        updateUser.append("user", this.props.user.user);
        updateUser.append("name", this.props.user.name);
        if(this.props.type == 'profile'){
            updateUser.append("avatar", event.target.parentElement.getElementsByTagName('input')[0].files[0]);
        } else {
            updateUser.append("cover", event.target.parentElement.getElementsByTagName('input')[0].files[0]);            
        }

        const newPost = new FormData();
        newPost.append("user", this.props.user.pk);
        newPost.append("content", `${this.props.user.name} has uploaded his ${this.props.type} picture!`);
        newPost.append("privacy", 'public');
        newPost.append("media", event.target.parentElement.getElementsByTagName('input')[0].files[0]);



        await axios({
            method: "put",
            url: `http://192.168.1.107/api/users/${this.props.user.pk}`,
            data: updateUser,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(response => toast.success('Successfully uploaded!'))
          .then(() => {
            axios({
                method: "post",
                url: "http://192.168.1.107/api/posts/",
                data: newPost,
                headers: { "Content-Type": "multipart/form-data" },
              }).then(() => this.props.getPosts())
          })
          .catch(error => {
            toast.error('Error! Try again')
            console.log(error)
            this.ClickCancelPictureHandle(event)
        })

          event.target.parentElement.getElementsByTagName('form')[0].reset()
          this.setState({toggledOpen:false})
    }

    PreviewPictureHandle = (event) => {
        const [file] = event.target.files
        var backgroundElement
        if (this.props.type == 'profile'){
            backgroundElement = event.target.parentElement.parentElement.parentElement.getElementsByClassName("avatar")[0]; 
        } else {
            backgroundElement = event.target.parentElement.parentElement.parentElement; 
        }

        if (file) {
            let imagePreview = URL.createObjectURL(file)
            backgroundElement.style.backgroundImage = `url(${imagePreview})`
            this.setState({toggledOpen:true})
        } 
    }

    checkToggleButtons(toggled){
        var toggled = toggled == this.state.toggledOpen
        if (toggled){return 'flex'} else {return 'none'}}

    render (){

            return (
                <div className='EditPicture'>
                    <div><Toaster/></div>
                    <a onClick={this.ClickUploadPictureHandle} style={{display:this.checkToggleButtons(false)}} className='ChangePicture'>
                    </a>
                    <a className='SavePicture' onClick={this.ClickSavePictureHandle}  style={{display:this.checkToggleButtons(true)}}>
                        Save
                    </a>
                    <a className='CancelPicture' onClick={this.ClickCancelPictureHandle} style={{display:this.checkToggleButtons(true)}}>
                        Cancel
                    </a>
                    <form name='change_picture_form' style={{display:'none'}}>
                        <input onChange={this.PreviewPictureHandle} name="imageField" type="file" accept="image/*"></input>
                    </form>
                </div>
            )                
    }
}

export default ChangePicture

