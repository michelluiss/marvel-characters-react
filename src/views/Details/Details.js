import React, { Component } from 'react'
import api from '../../services/api'
import md5 from 'js-md5'
import DetailsCard from '../../components/details/DetailsCard'


export default class CharacterList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      character: [],
      id: props.match.params.id,
      comics: [],
      events: [],
      series: [],
      stories: []
    }
  }

  async componentDidMount() {
    this.fetchCharacter()
    this.fetchComics()
    this.fetchEvents()
    this.fetchSeries()
    this.fetchStories()
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

  fetchSeries = () => {
    const params = this.defineParams()
    api.get(`/v1/public/characters/${this.state.id}/series`, { params })
      .then(response => {
        this.setState({ series: [...response.data.data.results] })
      })
      .catch(error => {
        console.log(error)
      })
  }

  fetchStories = () => {
    const params = this.defineParams()
    api.get(`/v1/public/characters/${this.state.id}/stories`, { params })
      .then(response => {
        this.setState({ stories: [...response.data.data.results] })
      })
      .catch(error => {
        console.log(error)
      })
  }

  fetchEvents = () => {
    const params = this.defineParams()
    api.get(`/v1/public/characters/${this.state.id}/events`, { params })
      .then(response => {
        this.setState({ events: [...response.data.data.results] })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    if (this.state.character.length === 0 &&
      this.state.comics.length === 0 &&
      this.state.series.length === 0 &&
      this.state.events.length === 0 &&
      this.state.stories.length === 0) return <div>Buscando dados</div>
    return(
      <div className="details-page">
        <div className="container">
          <div className="details-content pb-5">
            <div className="image mb-3">
              <img src={this.state.character.thumbnail.path + '.' + this.state.character.thumbnail.extension} alt="Foto do personagem"></img>
            </div>
            <h1 className="text-center">Nome: {this.state.character.name}</h1>
            <div className="mt-4">
              <h3>Comics</h3>
              <div className="d-flex flex-wrap">
                {this.state.comics.length > 0 ? this.state.comics.map(item => {
                  return (
                    <DetailsCard item={item} propertyImage="image"></DetailsCard>
                  )
                }) : <div className="px-3">Nenhum Comics registrado</div>
                }
              </div>
            </div>
            <div className="mt-4">
              <h3>Series</h3>
              <div className="d-flex flex-wrap">
                {this.state.series.length > 0 ? this.state.series.map(item => {
                  return (
                    <DetailsCard item={item} propertyImage="thumbnail"></DetailsCard>
                  )
                }) : <div className="px-3">Nenhuma Serie registrada</div>
                }
              </div>
            </div>
            <div className="mt-4">
              <h3>Stories</h3>
              <div className="d-flex flex-wrap">
                {this.state.stories.length > 0 ? this.state.stories.map(item => {
                  return (
                    <DetailsCard item={item} propertyImage="thumbnail"></DetailsCard>
                  )
                }) : <div className="px-3">Nenhum Stories registrado</div>
                }
              </div>
            </div>
            <div className="mt-4">
              <h3>Events</h3>
              <div className="d-flex flex-wrap">
                {this.state.events.length > 0 ? 
                  this.state.events.map(item => {
                    return (
                      <DetailsCard item={item} propertyImage="thumbnail"></DetailsCard>
                    )
                  }) : <div className="px-3">Nenhum Evento registrado</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
