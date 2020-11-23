import React from 'react'

function Image({ data }) {
  if (data.thumbnail) {
    return <img src={data.thumbnail.path + '.' + data.thumbnail.extension} className="card-img-bottom" alt="Foto do quadrinho" />
  } else return null
}

export default function DetailsCard({ item }) {
  if (!item) return null
  return(
    <div className="col-12 col-sm-6">
      <div className="card mb-3">
        <div className="row no-gutters">
          {item.thumbnail ?
            <div className="col-md-4"><Image data={item}></Image></div>
            : null
          }
          <div className={item.thumbnail ? "col-md-8" : "col-md-12"}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}