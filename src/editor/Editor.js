import React, { Component } from 'react';

class Editor extends Component {
  constructor(props) {
    super()
    this.state = {
      play: (JSON.parse(localStorage.getItem("schedule")) || {})
    }
  }


}