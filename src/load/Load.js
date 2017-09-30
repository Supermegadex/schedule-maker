import React, { Component } from 'react';
import { IconButton, TextField } from "material-ui";
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
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

class Load extends Component {
  constructor(props) {
    super();
    this.state = {
      id: props.playId || ""
    };
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Card>
          <CardHeader title={"Load Production"} />
          <CardContent>
            <TextField
              id="id"
              label="ID"
              className={classes.id}
              value={this.state.id}
              onChange={event => this.setState({ id: event.target.value })}
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <div className={classes.flexGrow} />
            <IconButton color="primary" aria-label="Finish" onClick={() => this.props.onLoad(this.state.id)}>
              <DoneIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    )
  }
}

Load.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Load);