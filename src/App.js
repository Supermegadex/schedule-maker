import React, { Component } from 'react';
import './App.css';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
import TitleBar from './titlebar/TitleBar';
import Editor from './editor/Editor';
import { Dialog } from "material-ui";
import Slide from 'material-ui/transitions/Slide';
import New from "./new/New";
import Load from "./load/Load";

class App extends Component {
  constructor(props) {
    super();
    this.schedule = JSON.parse(localStorage.getItem("schedule"));
    this.db = window.firebase.database();
  }

  componentWillMount() {
    this.setState({
      title: "",
      id: this.schedule ? localStorage.getItem("id") : "",
      play: this.schedule,
      dialogOpen: false
    }, () => {
      if (!this.state.play) {
        this.openDialog();
      }
      else {
        this.setState({ title: this.state.play.title });
      }
      this.checkIfLoggedIn();
    });
  }

  checkIfLoggedIn() {
    window.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getToken().then((accessToken) => {
          this.setState({
            signedIn: true, uid: user.uid, name: user.displayName
          }, () => this.checkIfAccessId())
        });
      } else {
        this.setState({ signedIn: false });
      }
    }, function (error) {
      console.log(error);
    });
  }

  openDialog() {
    this.handleOpen();
  }

  newPlay = (id, title) => {
    if (!id || !title) return false;
    // let play = this.state.play || {};
    let play = {
      title: title,
      schedule: [{
        date: "",
        from: "",
        to: "",
        times: [{
          from: "",
          to: "",
          people: "",
          acting: "",
          dancing: "",
          music: ""
        }]
      }]
    };
    this.setState({ play: play, title: title, id: id }, () => {
      this.handleClose();
    });
  };

  handleOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleSave = (data) => {
    let play = Object.assign({}, this.state.play);
    play = data;
    this.setState({ play: play }, () => localStorage.setItem("schedule", JSON.stringify(this.state.play)));
    localStorage.setItem("id", this.state.id);
  };

  handleLogin = () => {
    let uiConfig = {
      callbacks: {
        signInSuccess: (currentUser, credential, redirectUrl) => {
          document.querySelector("#auth").className = "hidden";
          this.setState({
            signedIn: true,
            name: currentUser.displayName,
            uid: currentUser.uid
          });
          return false;
        },
      },
      signInOptions: [
        window.firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      tosUrl: '<your-tos-url>',
      credentialHelper: window.firebaseui.auth.CredentialHelper.NONE
    };
    if (!this.fbui) {
      this.fbui = new window.firebaseui.auth.AuthUI(window.firebase.auth());
    }
    document.querySelector("#auth").className = "show";
    this.fbui.start('#auth', uiConfig);
  };

  checkIfAccessId() {
    this.db.ref(`/users/${this.state.uid}/__access--id__`).once("value")
      .then(snap => {
        if (!snap.val()) {
          this.generateAccessId();
        }
      })
  }

  generateAccessId() {
    let accessId = ((length, max) => [...new Array(length)]
      .map(() => Math.round(Math.random() * max)))(8, 9);
    this.db.ref(`/ids/${accessId}`).once("value")
     .then(snap => {
      if (snap.val()) {
        this.generateAccessId();
       }
      else {
        this.db.ref(`/ids/${accessId.join("")}/id`).set(this.state.uid);
        this.db.ref(`/users/${this.state.uid}/__access--id__`).set(accessId.join(""));
      } 
    })
  }

  handleLogout = () => {
    window.firebase.auth().signOut().then(() => {
      this.setState({ name: "", signedIn: false, uid: null });
    }, function (error) {
      throw error;
    });
  };

  handleUpload = () => {
    this.db.ref(`/users/${this.state.uid}/${this.state.id}`).update(this.state.play);
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleLoadDialog = () => {
    this.setState({ loading: true, dialogOpen: true });
  };

  handleNew = () => {
    this.setState({ dialogOpen: true });
  };

  handleLoad = (id) => {
    this.db.ref(`/users/${this.state.uid}/${id}`).once("value").then(snap => {
      let newPlay = snap.val();
      console.log(newPlay);
      this.setState({ loading: false, dialogOpen: false, title: newPlay.title, id: id },
          () => { this.handleSave(newPlay); });
    })
  };

  handleDownload() {
    let downloadUrl = URL.createObjectURL(new Blob([localStorage.getItem("schedule")], { type: 'application/json' }));
    window.open(downloadUrl);
  }

  render() {
    return (
      <div className="App">
        <Dialog open={this.state.dialogOpen} onRequestClose={this.handleClose} transition={<Slide direction={"up"} />}>
          {
            this.state.loading ? 
              <Load onLoad={this.handleLoad} playId={this.state.id} />
            : <New onCreate={this.newPlay} />
          }  
        </Dialog>
        <TitleBar title={this.state.title}
                  upload={this.handleUpload}
                  download={() => this.handleDownload()}
                  new={this.handleNew}
                  load={this.handleLoadDialog}
                  login={this.state.signedIn ? this.handleLogout : this.handleLogin}
                  name={this.state.name}
                  signedIn={this.state.signedIn}/>
        {this.state.play ? <Editor play={this.state.play} save={this.handleSave}/> : false}
      </div>
    );
  }
}

export default App;
