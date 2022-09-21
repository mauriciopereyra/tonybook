import React from 'react';

class SelectUser extends React.Component {

  constructor(props){
    super(props)
    this.state = {selectedUserId:1}
  }


   updateUser = event => {
    this.setState({selectedUserId:event.target.value});
    this.props.changeUser(event.target.value)
  };

  componentDidMount(){
  }

  render() {

    return (
      <>
        <select onChange={this.updateUser} value={this.state.selectedUserId}>
          {this.props.users.map(user => (
            <option key={user.pk} value={user.pk}>
              {user.name}
            </option>
          ))}
        </select>
      </>
    );
  }
}

export default SelectUser;
