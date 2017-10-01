import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SaveIcon from 'material-ui-icons/Save';
import CloudUpload from 'material-ui-icons/CloudUpload';
import CloudDownload from 'material-ui-icons/CloudDownload';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import ShareIcon from 'material-ui-icons/Share';
import PersonOutline from 'material-ui-icons/PersonOutline';

const styles = {
  flex: {
    flex: '1 1 auto'
  }
};

function TitleBar(props) {
  const classes = props.classes;
  return (
    <AppBar position="fixed" color="accent">
      <Toolbar>
        <Typography type="title" color="inherit">
          {props.title} Schedule
        </Typography>
        <div className={classes.flex} />
        <Typography type="subheading">
          {props.name}
        </Typography>
        <IconButton onClick={() => props.login()}>
          {
            props.signedIn ? <PersonOutline /> : <PersonIcon />
          }
        </IconButton>
        {
          props.signedIn ?
          <span>
            <IconButton onClick={() => props.upload()}>
              <CloudUpload />
            </IconButton>
            <IconButton onClick={() => props.load()}>
              <CloudDownload />
            </IconButton>
            <IconButton onClick={() => props.share()}>
              <ShareIcon />
            </IconButton>
          </span> : false
        }
        <IconButton onClick={() => props.download()}>
          <SaveIcon />
        </IconButton>
        <IconButton onClick={() => props.new()}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleBar);