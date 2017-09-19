import React, { Component } from 'react';
import {Typography} from "material-ui";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Day from "../day/Day";
import Button from 'material-ui/Button'
import EventIcon from 'material-ui-icons/Event'

const styles = theme => ({
  root: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 100
  },
  fab: {
    position: 'fixed',
    right: 25,
    bottom: 25
  },
  day: {
    marginTop: 20
  }
});

class Editor extends Component {
  constructor(props) {
    console.log(props);
    super();
    this.state = {
      play: props.play
    };
  }

  handleSave(index, data) {
    console.log(data);
    let schedule = this.state.play.schedule;
    schedule[index] = data;
    let play = Object.assign(this.state.play, {schedule: schedule});
    this.setState({ play: play }, () => this.props.save(this.state.play));
  }

  handleNewDate = () => {
    let play = Object.assign({}, this.state.play);
    play.schedule.push({
      times: [{
        from: "", to: "", people: "",
        acting: "",
        dancing: "",
        music: ""
      }],
      date: "", from: "", to: ""
    });
    this.setState({ play: play });
  }

  render() {
    console.log(this.state.play);
    const classes = this.props.classes;
    return (
        <div className={classes.root}>
          {this.state.play.schedule.map((d, i) => {
            return (
              <div className={classes.day}>
                <Day day={d} key={i} i={i} save={(index, data) => this.handleSave(index, data)} />
              </div>
            )
          })}
          <Button fab color="primary" aria-label="add" className={classes.fab} onClick={this.handleNewDate}>
            <EventIcon />
          </Button>
        </div>
    )
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editor);