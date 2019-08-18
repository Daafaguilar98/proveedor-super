import React, { Component } from "react";
import "./App.css";
import { StateProvider } from "./store";
import reducer, { initialState } from "./store/reducer";
import Admin from "./Views/Admin";

class App extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <Admin />
      </StateProvider>
    );
  }
}

export default App;
