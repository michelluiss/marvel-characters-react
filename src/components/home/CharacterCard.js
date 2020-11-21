import React from 'react'

export default function CharacterCard({ character }) {
  if (!character) return null
  return(
    <div className="character-card">
      <div className="row">
        <div className="col-4 character-column">
          <div className="image">
            <img src={character.thumbnail.path + '.' + character.thumbnail.extension} alt="Foto do personagem"></img>
          </div>
          <span className="character-name">{character.name}</span>
        </div>
        <div className="col-4 series-column">
          {character.series.items.map((serie, idx) => {
            return idx <= 2 ? <p key={serie.id}>{serie.name}</p> : null
          })}
        </div>
        <div className="col-4 events-column">
          {character.events.items.map((event, idx) => {
            return idx <= 2 ? <p key={event.id}>{event.name}</p> : null
          })}
        </div>
      </div>
    </div>
  )
}