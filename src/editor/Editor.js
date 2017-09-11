import React, { Component } from 'react';
import {Typography} from "material-ui";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Day from "../day/Day";

const styles = theme => ({
  root: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25
  }
});

class Editor extends Component {
  constructor(props) {
    super();
    this.state = {
      play: props.play
    };
    console.log(Array.prototype.map.call(this.state.play.schedule, (a) => {return a}));
  }

  handleSave(index, data) {
    let schedule = this.state.play.schedule;
    schedule[index] = data;
    let play = Object.assign(this.state.play, {schedule: schedule});
    this.setState({ play: play }, () => this.props.save(this.state));
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