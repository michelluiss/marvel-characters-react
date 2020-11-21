import React, { Component } from 'react'
import HeaderList from '../../components/home/HeaderList'
import CharacterCard from '../../components/home/CharacterCard'
import api from '../../services/api'
import md5 from 'js-md5';
const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY
const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY
const ts = Number(new Date())
const hash = md5.create();
hash.update(ts + privateKey + publicKey);

let params = { 
  apikey: publicKey,
  ts: ts,
  hash: hash.hex(),
  limit: 10,
  offset: 0
}

export default class CharacterList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      characters: null,
      count: null
    }
  }

  async componentDidMount() {
    this.fetchCharacters(params)
  }

  nextPage = () => {
    params.offset += 10
    this.fetchCharacters(params)
  }

  prevPage = () => {
    params.offset -= 10
    this.fetchCharacters(params)
  }

  fetchCharacters = (params) => {
    
    api.get('/v1/public/characters', { params })
      .then(response => {
        console.log(response.data)
        if (this.state.characters) {
          this.setState({ characters: [...this.state.characters, ...response.data.data.results] })
        } else {
          this.setState({ characters: [...response.data.data.results] })
        }
        this.setState({ count: response.data.count })
      })
      .catch(error => {
        console.log(error)
      })
  }
  // http://marvel.dl.llnw.net/wdig/marvel/u/prod/marvel/i/mg/9/50/4ce18691cbf04/
  render() {
    return(
      <div className="character-list">
        <HeaderList></HeaderList>
        {this.state.characters ? this.state.characters.map(item => {
          return <CharacterCard character={item} key={item.id}></CharacterCard>
        }) : 'Nenhum personagem'}
        <div className="footer">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link" onClick={() => this.prevPage()}>&laquo;</button>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <button className="page-link" onClick={() => this.nextPage()}>&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}