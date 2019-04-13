import React, { Component } from 'react';
import './App.css';
import Admin from './Views/Admin';
class App extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return <Admin />;
  }
}

export default App;
