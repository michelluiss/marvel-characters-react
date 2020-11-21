import React, { Component } from 'react'
import api from '../../services/api'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: null
    }
  }

  async componentDidMount() {
  }

  fetchCharacters = async (concatState = true) => {
  };

  render() {
    return (
      <div className="home-page">
        <div className="container">
          <h1>Home</h1>
        </div>
      </div>
    )
  }

}