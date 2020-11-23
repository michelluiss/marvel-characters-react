import React from 'react'

export default function HeaderList() {
  return(
    <div className="head-list">
      <div className="row">
        <div className="col-4">
          <span>Personagens</span>
        </div>
        <div className="col-4 d-none d-md-block">
          <span>Séries</span>
        </div>
        <div className="col-4 d-none d-md-block">
          <span>Eventos</span>
        </div>
      </div>
    </div>
  )
}