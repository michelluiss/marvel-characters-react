import React, { Component } from 'react'
import CharacterList from '../../components/home/CharacterList'
// import { FaBeer } from 'react-icons/fa';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charactersSearch: ''
    }
  }

  render() {
    return (
      <div className="home-page">
        <div className="container">
          <h1>Busaca de personagens</h1>
          <div className="search-box">
            <p>Nome do personagem</p>
            <input type="text"
              className="form-control"
              placeholder="Search"
              value={this.state.charactersSearch}
              onChange={e => this.setState({ charactersSearch: e.target.value })}
            />
          </div>
        </div>
        <CharacterList
          search={this.state.charactersSearch}
        />
      </div>
    )
  }

}