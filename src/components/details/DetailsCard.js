import React from 'react'

function Image({ data, propertyImage }) {
  if (propertyImage === 'thumbnail' && data.thumbnail) {
    return <img src={data.thumbnail.path + '.' + data.thumbnail.extension} className="card-img-bottom" alt="Foto do quadrinho" />
  } else if (propertyImage === 'image') {
    return <img src={data.images[0].path + '.' + data.images[0].extension} className="card-img-bottom" alt="Foto do quadrinho" />
  } else return null
}

export default function DetailsCard({ item, propertyImage }) {
  if (!item) return null
  return(
    <div className="col-6">
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <Image data={item} propertyImage={propertyImage}></Image>
          </div>
          <div className="col-md-8">
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