import React, { Component } from 'react';
import {IconButton, TextField, Typography} from "material-ui";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DoneIcon from 'material-ui-icons/Done';

const styles = theme => ({
  root: {
    marginTop: 40
  },
  textField: {
    margin: theme.spacing.unit
  },
  id: {
    margin: theme.spacing.unit,
    width: 100
  },
  title: {
    margin: theme.spacing.unit,
    width: 200
  },
  flexGrow: {
    flex: '1 1 auto',
  }
});

class New extends Component {
  constructor(props) {
    super();
  }

  state = {
    id: "",
    title: ""
  };

  render() {
    const classes = this.props.classes;
    return (
        <div>
          <Card>
            <CardHeader title={this.state.title || "New Production"}/>
            <CardContent>
              <TextField
                  id="id"
                  label="ID"
                  className={classes.id}
                  value={this.state.id}
                  onChange={event => this.setState({ id: event.target.value })}
                  margin="normal"
              /><TextField
                id="title"
                label="Title"
                className={classes.title}
                value={this.state.title}
                onChange={event => this.setState({ title: event.target.value })}
                margin="normal"
              />
            </CardContent>
            <CardActions>
              <div className={classes.flexGrow} />
              <IconButton color="primary" aria-label="Finish" onClick={() => this.props.onCreate(this.state.id, this.state.title)}>
                <DoneIcon/>
              </IconButton>
            </CardActions>
          </Card>
        </div>
    )
  }
}

New.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(New);