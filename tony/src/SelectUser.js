import React from 'react';

class SelectUser extends React.Component {
  state = {
    options: [
      {
        name: 'Mauricio',
        value: '0',
      },
      {
        name: 'Oum',
        value: '1',
      },
    ],
    name: 'Mauricio',
    value: '0',
  };

  handleChange = (event) => {
    this.setState({ 
      value: event.target.value,
      name: event.target.selectedOptions[0].innerHTML,
    });
  };

  render() {
    const { options, name, value } = this.state;

    return (
      <>
        <select onChange={this.handleChange} value={value}>
          {options.map(item => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <h1>Current user: {name}</h1>
      </>
    );
  }
}

export default SelectUser;
