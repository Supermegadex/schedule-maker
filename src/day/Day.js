import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {IconButton, TextField} from "material-ui";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import classnames from "classnames";
import AddIcon from 'material-ui-icons/Add';
import SaveIcon from 'material-ui-icons/Save';
import Time from "../time/Time";

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
    margin: theme.spacing.unit,
    fontSize: '2rem'
  }
});

class Day extends Component {
  constructor(props) {
    super();
    this.state = props.day;
  }

  handleSave = () => {
    this.props.save(this.props.i, this.state)
  };

  handleText(prop, i, event) {
    let state = this.state;
    state.times[i][prop] = event.target.value;
    this.setState(state);
  }

  addTime = () => {
    let times = this.state.times.map((a) => {return a});
    times.push({
      from: "",
      to: "",
      people: ""
    });
    this.setState({times: times});
  };

  render() {
    const classes = this.props.classes;
    return (
        <Card>
          <CardContent>
            <TextField
              id="date"
              label="Date"
              className={classes.textField}
              value={this.state.date}
              onChange={event => this.setState({ date: event.target.value })}
              margin="normal"
            />
            <TextField
              id="from"
              label="Start time"
              className={classes.textField}
              value={this.state.from}
              onChange={event => this.setState({ from: event.target.value })}
              margin="normal"
            />
            <TextField
              id="to"
              label="End time"
              className={classes.textField}
              value={this.state.to}
              onChange={event => this.setState({ to: event.target.value })}
              margin="normal"
            />
            {this.state.times.map((d, t) => {
              return <Time time={d} key={t} i={t} type={(a, b, c) => this.handleText(a, b, c)}/>
            })}
          </CardContent>
          <CardActions>
            <div className={classes.flexGrow}/>
            <IconButton onClick={() => this.addTime()}>
              <AddIcon/>
            </IconButton>
            <IconButton onClick={() => this.handleSave()}>
              <SaveIcon/>
            </IconButton>
          </CardActions>
        </Card>
    )
  }
}

Day.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Day);