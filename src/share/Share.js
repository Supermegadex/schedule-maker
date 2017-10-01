import React, { Component } from 'react';
import { IconButton, Typography } from "material-ui";
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
    fontFamily: '"Roboto Mono", monospace'
  },
  flexGrow: {
    flex: '1 1 auto',
  }
});

class Share extends Component {
  constructor(props) {
    super();
  }

  state = {
    
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Card>
          {/* <CardHeader title={"Share"} /> */}
          <CardContent>
            <Typography type="title">
              Play ID:
            </Typography>
            <Typography type="display1" className={classes.id}>
              {this.props.playId}
            </Typography>
            <hr />
            <Typography type="title">
              Access Code:
            </Typography>
            <Typography type="display1" className={classes.id}>
              {this.props.accessId}
            </Typography>
          </CardContent>
          <CardActions>
            <div className={classes.flexGrow} />
            <IconButton color="primary" aria-label="Finish" onClick={() => this.props.done()}>
              <DoneIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    )
  }
}

Share.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Share);