import './App.css';
import PostsList from './PostsList.js'
import SelectUser from './SelectUser.js'
import React from 'react';


class App extends React.Component {


render() {
  return (
  <div className='wrapper'>
      <><SelectUser/></>
      <><PostsList/></>
  </div>
  );
}
}

export default App;
