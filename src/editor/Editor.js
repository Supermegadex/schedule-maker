import React, { Component } from 'react';
import {Typography} from "material-ui";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Day from "../day/Day";

const styles = theme => ({
  root: {
    marginTop: 40
  }
});

class Editor extends Component {
  constructor(props) {
    super();
    this.state = {
      play: props.play
    };
    console.log(this.state.play);
    // if (!this.state.play[this.props.play]) {
    //   this.state.play[this.props.play] = {
    //     title: "",
    //     schedule: []
    //   }
    // }
  }

  handleSave(index, data) {
    let schedule = this.state.play.schedule;
    schedule[index] = data;
    let play = Object.assign(this.state.play, {schedule: schedule});
    console.log(play);
  }

  render() {
    const classes = this.props.classes;
    return (
        <div className={classes.root}>
          {this.state.play.schedule.map((d, i) => {
            return <Day day={d} key={i} i={i} save={(index, data) => this.handleSave(index, data)}/>
          })}
        </div>
    )
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editor);