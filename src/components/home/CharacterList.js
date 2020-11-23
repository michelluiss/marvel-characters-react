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
      count: 0,
      limit: 10,
      offset: 0,
      total: 0,
      pagesNav: [
        {
          page: 1,
          offset: 0
        },
        {
          page: 2,
          offset: 10
        },
        {
          page: 3,
          offset: 20
        },
        {
          page: 4,
          offset: 40
        },
        {
          page: 5,
          offset: 50
        }
      ]
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

  nextPage = (opt = '') => {
    console.log(this.state.offset)
    const params = this.defaultParams()
    if (opt === 'all') {
      params.offset = this.state.total - 10
      params.limit = 10
    } else {
      params.offset = this.state.offset + 10
      params.limit = 10
    }
    this.fetchCharacters(params)
  }

  prevPage = (opt) => {
    const params = this.defaultParams()
    if (opt === 'all') {
      params.offset = 0
      params.limit = 10
    } else {
      params.offset = this.state.offset - 10
      params.limit = 10
    }
    this.fetchCharacters(params)
  }

  goToPage = (page) => {
    const params = this.defaultParams()
    params.offset = page.offset
    params.limit = 10
    this.fetchCharacters(params)
  }

  fetchCharacters = (params) => {
    api.get('/v1/public/characters', { params })
      .then(response => {
        console.log(response.data.data)
        this.setState({
          characters: [...response.data.data.results],
          total: response.data.data.total,
          offset: response.data.data.offset,
          count: response.data.data.count
        })
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
                <button className="page-link arrow-button" onClick={() => this.prevPage('all')}>&laquo;</button>
              </li>
              <li className="page-item button-icons">
                <button className="page-link arrow-button" onClick={() => this.prevPage()}>&lt;</button>
              </li>
              {this.state.pagesNav.map(item => {
                return (<li className={item.page === (this.state.offset / this.state.limit) + 1 ? 'page-item active' : 'page-item'}>
                  <button className="page-link" onClick={() => this.goToPage(item)}>{item.page}</button>
                </li>)
              })}
              <li className="page-item button-icons">
                <button className="page-link arrow-button"
                  onClick={() => this.nextPage()}
                  disabled={this.state.offset === (this.state.total - 10)}
                >&gt;</button>
              </li>
              <li className="page-item">
                <button className="page-link arrow-button"
                  onClick={() => this.nextPage('all')}
                  disabled={this.state.offset === (this.state.total - 10)}
                >&raquo;</button>
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
