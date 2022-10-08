import React from 'react'
import './Notifications.css'
import axios from 'axios'
import { ipAddress } from './serverInfo';

class Notifications extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
            notifications: [],
            new_notifications: 0,
        }
        document.body.addEventListener("click",function(event){this.setState({open:false})}.bind(this))
    }

    getNotifications = () => {
        if (this.props.loggedUser){
        axios
        .get(`${ipAddress}/api/notifications/user/${this.props.loggedUser.pk}`)
        .then(res => {
            this.setState({
                notifications:res.data,
                new_notifications: res.data.filter(notification => !notification.read).length,
            })
    })
        .catch(err => console.log(err)); }
    }

    toggleNotifications = (event) => {
        this.setState({open:!this.state.open})
        event.stopPropagation()
    }

    notificationsNumber = () => {
        if (this.state.new_notifications > 0){
            return <div className='notifications-number'>{this.state.new_notifications}</div>
        } else {
            return ""
        }
    }

    handleNotificationClick = (event) => {
        event.stopPropagation()
    }

    notificationsList = () => {
        return this.state.notifications.map((notification) => {
            var action = notification.category == 'reaction' ? 'commented' : 'reacted'
            return <li onClick={this.handleNotificationClick} key={notification.pk}>
                <a href={`/posts/${notification.post_info.pk}`}>{notification.user_info.name} {action} on your post "{notification.post_info.content}"</a>
                </li>

        }) 
    }

    isUserLogged = () => {
        const open = this.state.open
        const dropdown_class = open ? "notifications-dropdown" : "notifications-dropdown-hidden"
        if(this.props.loggedUser) {
            return (
                <div className='notifications'>
                    <div className='notifications-button' onClick={this.toggleNotifications}>
                        {this.notificationsNumber()}
                    </div>
                    <ul className={dropdown_class}>
                            {this.notificationsList()}
                        </ul>
                </div>
            )
        } else {
            return (
                <div className='notifications'></div>
            )
        }
    }

    componentDidUpdate(){
        this.getNotifications()
    }

    render(){
        return (
            this.isUserLogged()
        )
    }

}

export default Notifications
