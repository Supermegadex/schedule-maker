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
    marginBottom: theme.spacingUnit
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

class Day extends Component {
  constructor(props) {
    super();
    console.log(props.i);
    this.state = {
      day: props.day
    };
    console.log(this.state);
  }

  handleSave() {
    this.props.save(this.props.i, this.state)
  }

  handleText(prop, event) {
    console.log("At hT");
    let state = {};
    switch (prop) {
      case "date" || "from" || "to":
        console.log("Switch");
        state[prop] = event.target.value;
    }
    console.log(state);
    this.setState(state);
    // this.setState({ title: event.target.value })
  }

  render() {
    const classes = this.props.classes;
    return (
        <Card>
          <CardContent>
            <TextField
                id="date"
                label="Date"
                className={classes.textField}
                value={this.state.day.date}
                onChange={event => this.handleText("date", event)}
                margin="normal"
            />
          </CardContent>
          <CardActions>
            <div className={classes.flexGrow}/>
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