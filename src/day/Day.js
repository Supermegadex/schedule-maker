import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import {IconButton, TextField} from "material-ui";
import AddIcon from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';
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
    // fontSize: '2rem'
  },
  section: {
    display: 'inline-block'
  },
  hr: {
    width: '75%',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    borderBottom: '8px #ff6e40 solid',
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
    let state = Object.assign({}, this.state);
    state.times[i][prop] = event.target.value;
    // this.setState(state, () => {
      this.handleSave();
    // });
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.day);
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

  removeTime = () => {
    let times = this.state.times.map((a) => { return a });
    times.pop();
    this.setState({ times: times }, () => {
      this.handleSave();
    });
  };

  editTopDetails(edit) {
    this.setState(edit, () => {
      this.handleSave();
    });
  }

  getRemoveButton() {
    if (this.state.times[1]) {
      return (
        <IconButton onClick={() => this.removeTime()}>
          <Remove />
        </IconButton>
      )  
    }  
  }

  render() {
    const classes = this.props.classes;
    return (
      <Card>
        <CardHeader title={this.state.date || 'Day ' + (this.props.i + 1)}/>
        <CardContent>
          <div className={classes.section}>
            <TextField
              id="date"
              label="Date"
              placeholder="10/10"
              className={classes.textField}
              value={this.state.date}
              onChange={event => this.editTopDetails({ date: event.target.value })}
              margin="normal"
            />
            <TextField
              id="from"
              placeholder="4:00"
              label="Start time"
              className={classes.textField}
              value={this.state.from}
              onChange={event => this.editTopDetails({ from: event.target.value })}
              margin="normal"
            />
            <TextField
              id="to"
              label="End time"
              placeholder="6:00"
              className={classes.textField}
              value={this.state.to}
              onChange={event => this.editTopDetails({ to: event.target.value })}
              margin="normal"
            />
          </div>
          {this.state.times.map((d, t) => {
            return <Time time={d} key={t} i={t} type={(a, b, c) => this.handleText(a, b, c)}/>
          })}
        </CardContent>
        <CardActions>
          <div className={classes.flexGrow} />
          {
            this.getRemoveButton()
          }
          <IconButton onClick={() => this.addTime()}>
            <AddIcon/>
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