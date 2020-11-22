import React, { Component } from 'react'
import api from '../../services/api'
import md5 from 'js-md5'


export default class CharacterList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      character: [],
      id: props.match.params.id,
      comics: []
    }
  }

  async componentDidMount() {
    await this.fetchCharacter()
    this.fetchComics()
  }

  defineParams = () => {
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

  fetchCharacter = () => {
    const params = this.defineParams()
    api.get(`/v1/public/characters/${this.state.id}`, { params })
      .then(response => {
        this.setState({ character: response.data.data.results[0] })
      })
      .catch(error => {
        console.log(error)
      })
  }

  fetchComics = () => {
    const params = this.defineParams()
    api.get(`/v1/public/characters/${this.state.id}/comics`, { params })
      .then(response => {
        this.setState({ comics: [...response.data.data.results] })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    if (this.state.character.length === 0 && this.state.comics.length === 0) return <div>Buscando dados</div>
    return(
      <div className="details-page">
        <div className="container">
          <div className="details-content">
            <div className="image">
              <img src={this.state.character.thumbnail.path + '.' + this.state.character.thumbnail.extension} alt="Foto do personagem"></img>
            </div>
            <h1 className="text-center">Nome: {this.state.character.name}</h1>
            <div className="d-flex mt-5">
              <div className="col-12">
                <h3>Comics</h3>
                {this.state.comics.map(item => {
                  return (
                    <div class="card mb-3">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img src={item.images[0].path + '.' + item.images[0].extension} class="card-img-bottom" alt="Foto do quadrinho" />
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
