import React from 'react'
import './Notifications.css'
import axios from 'axios'

class Notifications extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
            notifications: []
        }
        document.body.addEventListener("click",function(event){this.setState({open:false})}.bind(this))
    }

    getNotifications = () => {

    }

    toggleNotifications = (event) => {
        this.setState({open:!this.state.open})
        event.stopPropagation()
    }

    isUserLogged = () => {
        const open = this.state.open
        const dropdown_class = open ? "notifications-dropdown" : "notifications-dropdown-hidden"
        if(this.props.loggedUser) {
            return (
                <div className='notifications'>
                    <div className='notifications-button' onClick={this.toggleNotifications}>
                        <div className='notifications-number'>3</div>
                    </div>
                    <ul className={dropdown_class}>
                            <li>Hola</li>
                            <li>Hola 2</li>
                        </ul>
                </div>
            )
        } else {
            return (
                <div className='notifications'></div>
            )
        }
    }

    render(){
        return (
            this.isUserLogged()
        )
    }

}

export default Notifications
