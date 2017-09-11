import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {IconButton, TextField} from "material-ui";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import classnames from "classnames";
import SaveIcon from 'material-ui-icons/Save';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  table: {
    overflowX: "auto"
  },
  textField: {
    margin: theme.spacing.unit
  }
});

class Time extends Component {
  constructor(props) {
    super();
    console.log(props.i);
    this.state = props.time;
    console.log(this.state);
  }

  handleSave = () => {
    this.props.save(this.props.i, this.state)
  };

  handleText(prop, event) {
    this.props.type(prop, this.props.i, event);
    // let state = {};
    // state[prop] = event.target.value;
    // this.setState(state);
  }

  render() {
    const classes = this.props.classes;
    return (
        <div>
          <TextField
            label="Start Time"
            className={classes.textField}
            value={this.state.from}
            onChange={event => this.handleText("from", event)}
            // this.setState({ from: event.target.value })
            margin="normal"
          />
          <TextField
            label="End Time"
            className={classes.textField}
            value={this.state.to}
            onChange={event => this.handleText("to", event)}
            margin="normal"
          />
          <TextField
            label="People Needed"
            className={classes.textField}
            value={this.state.people}
            onChange={event => this.handleText("people", event)}
            margin="normal"
            fullWidth
          />
        </div>
    )
  }
}

Time.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Time);