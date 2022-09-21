import axios from 'axios'; 


function getUsers() {
    axios.get("http://192.168.1.107:8000/api/users/")
    .then(res => {return res.data})
}

export default getUsers 
