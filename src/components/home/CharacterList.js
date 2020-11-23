import React, { Component } from 'react'
import HeaderList from '../../components/home/HeaderList'
import CharacterCard from '../../components/home/CharacterCard'
import api from '../../services/api'
import md5 from 'js-md5'

export default class CharacterList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      characters: null,
      count: null,
      limit: 10,
      offset: 0
    }
  }

  async componentDidMount() {
    const params = this.defaultParams()
    params.limit = this.state.limit
    params.offset = this.state.offset
    this.fetchCharacters(params)
  }

  static UNSAFE_componentWillReceiveProps(props) {
    const params = this.defaultParams()
    if (props.search !== '') {
      params.name = props.search
      this.fetchCharacters(params)
    } else this.fetchCharacters(params)
  }

  defaultParams = () => {
    const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY
    const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY
    const ts = Number(new Date())
    const hash = md5.create();
    hash.update(ts + privateKey + publicKey);
    return {
      apikey: publicKey,
      ts: ts,
      hash: hash.hex()
    }
  }

  // nextPage = () => {
  //   params.offset += 10
  //   this.fetchCharacters(params)
  // }

  // prevPage = () => {
  //   params.offset -= 10
  //   this.fetchCharacters(params)
  // }

  fetchCharacters = (params) => {
    api.get('/v1/public/characters', { params })
      .then(response => {
        this.setState({ characters: [...response.data.data.results] })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return(
      <div className="character-list">
        <div className="container">
          <HeaderList></HeaderList>
          <ShowCard characters={this.state.characters} search={this.props.search}></ShowCard>
        </div>
        <div className="footer">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link arrow-button" onClick={() => this.prevPage()}>&laquo;</button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => this.nextPage()}>1</button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => this.nextPage()}>2</button>
              </li>
              <li className="page-item">
                <button className="page-link arrow-button" onClick={() => this.nextPage()}>&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

function ShowCard({ characters, search }) {
  if (characters === null) {
    return <div className="feedback-load-characters">Buscando personagens...</div>
  } else if (characters !== null & characters.length > 0) {
    return characters.map(item => {
      return <CharacterCard character={item} key={item.id}></CharacterCard>
    })
  } else {
    return <div className="feedback-load-characters">Nenhum personagem encontrado com {search}</div>
  }
}
