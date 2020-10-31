import React, { Component } from 'react';
import './App.css';
import UserApp from './components/UserApp';


class App extends Component {
  render() {
    return (
      <div className="container">
        <UserApp />
      </div>
    );
  }
}

export default App;
