import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    var helloWorld = 'Welcome to the Road to leatn React';
    var user = {
      firstName: 'Yang',
      lastName: 'Yin'
    };
    return (
        <div className="App-intro">
          <h2>{helloWorld}</h2>
          <ul>
            <li>First Name: {user.firstName}</li>
            <li>Last Name: {user.lastName}</li>
          </ul>
        </div>
    );
  }
}

export default App;
