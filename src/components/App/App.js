import React, { Component } from 'react';
import './App.css';
import Table from '../Table/Table';
import Panel from '../Panel/Panel';
import Alert from '../Alert/Alert';

import { Store, Consumer } from "../Store";

class App extends Component {
  render() {
    return (
      <Store>
        <div className="App">
          <div className="App-bg" />
          <header className="App-header">
            <div className="App-title"><h1>Welcome to Dogs DataBase</h1></div>
          </header>
          <main className="App-main">
            <Consumer>
              {({state}) => <Alert {...state}/>}
            </Consumer>
            <Consumer>
              {({state}) => <Panel {...state}/>}
            </Consumer>
            <Consumer>
              {({state}) => <Table {...state}/>}
            </Consumer>
          </main>
        </div>
      </Store>
    );
  }
}

export default App;
