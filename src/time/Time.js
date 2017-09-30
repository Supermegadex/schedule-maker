import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { TextField } from "material-ui";

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
  },
  section: {
    marginTop: 50,
    borderLeft: theme.palette.primary[500] + ' 5px solid',
    paddingLeft: 10
  }
});

class Time extends Component {
  constructor(props) {
    super();
    this.state = props.time;
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.time);
  }

  handleSave = () => {
    this.props.save(this.props.i, this.state)
  };

  handleText(prop, event) {
    this.props.type(prop, this.props.i, event);
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.section}>
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
          multiline
          rowsMax="4"
          className={classes.textField}
          value={this.state.people}
          onChange={event => this.handleText("people", event)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Acting"
          multiline
          rowsMax="3"
          className={classes.textField}
          value={this.state.acting}
          onChange={event => this.handleText("acting", event)}
          margin="normal"
        />
        <TextField
          label="Dancing"
          multiline
          rowsMax="3"
          className={classes.textField}
          value={this.state.dancing}
          onChange={event => this.handleText("dancing", event)}
          margin="normal"
        />
        <TextField
          label="Singing"
          multiline
          rowsMax="3"
          className={classes.textField}
          value={this.state.music}
          onChange={event => this.handleText("music", event)}
          margin="normal"
        />
      </div>
    )
  }
}

Time.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Time);