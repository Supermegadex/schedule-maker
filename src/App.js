import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TitleBar from './titlebar/TitleBar';
import Editor from './editor/Editor';

class App extends Component {
  state = {
    title: ""
  }

  render() {
    return (
      <div className="App">
        <TitleBar title={this.state.title}/>
      </div>
    );
  }
}

export default App;
