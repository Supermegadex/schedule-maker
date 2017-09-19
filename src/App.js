import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TitleBar from './titlebar/TitleBar';
import Editor from './editor/Editor';
import { Dialog } from "material-ui";
import Slide from 'material-ui/transitions/Slide';
import New from "./new/New";

class App extends Component {
  constructor(props) {
    super();
    this.schedule = JSON.parse(localStorage.getItem("schedule"));
  }

  componentWillMount() {
    this.setState({
      title: "",
      id: this.schedule ? Object.keys(this.schedule)[0] : "",
      play: this.schedule,
      dialogOpen: false
    }, () => {
      if (!this.state.play) {
        this.openDialog();
      }
      else {
        this.setState({ title: this.state.play[this.state.id].title });
      }
    });
  }

  openDialog() {
    this.handleOpen();
  }

  newPlay = (id, title) => {
    if (!id || !title) return false;
    let play = this.state.play || {};
    play[id] = {
      title: title,
      schedule: [{
        date: "",
        from: "",
        to: "",
        times: [{
          from: "",
          to: "",
          people: "",
          acting: "",
          dancing: "",
          music: ""
        }]
      }]
    };
    this.setState({ play: play, title: title, id: id }, () => {
      this.handleClose();
    });
  };

  handleOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleSave = (data) => {
    let play = Object.assign({}, this.state.play);
    play[this.state.id] = data;
    this.setState({ play: play }, () => localStorage.setItem("schedule", JSON.stringify(this.state.play)));
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    return (
      <div className="App">
        <Dialog open={this.state.dialogOpen} onRequestClose={this.handleClose} transition={<Slide direction={"up"}/>}>
          <New onCreate={this.newPlay}/>
        </Dialog>
        <TitleBar title={this.state.title}/>
        {this.state.play ? <Editor play={this.state.play[this.state.id]} save={this.handleSave}/> : false}
      </div>
    );
  }
}

export default App;
