import React, { Component } from 'react'
import CharacterList from '../../components/home/CharacterList'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: null
    }
  }

  render() {
    return (
      <div className="home-page">
        <div className="container">
          <h1>Busaca de personagens</h1>
          <div className="search-box">
            <p>Nome do personagem</p>
            <input type="text" className="form-control" placeholder="Search"/>
          </div>
          <CharacterList></CharacterList>
        </div>
      </div>
    )
  }

}