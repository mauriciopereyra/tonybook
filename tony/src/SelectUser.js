import React from 'react';

class SelectUser extends React.Component {
  constructor(props){
    super(props)
  }

  render() {

    return (
      <>
        <select>
          {/* {this.props.users.map(user => (
            <option key={user.pk} value={user.pk}>
              {user.name}
            </option>
          ))} */}
        </select>
      </>
    );
  }
}

export default SelectUser;
