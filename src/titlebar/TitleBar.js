import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    marginTop: 30,
    width: '100%',
  },
};

function TitleBar(props) {
  const classes = props.classes;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography type="title" color="inherit">
          {props.title} Schedule
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleBar);