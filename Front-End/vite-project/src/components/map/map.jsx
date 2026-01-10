import React from 'react'
import {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "./map.scss"
import PIn from '../pin/PIn'
const Map = ({items}) => {
  // 33.6995, 73.0363
  // 52.4797, -1.90269
  return (
    <MapContainer 
     center={
      items.length === 1
        ? [items[0].lat, items[0].long]
        : [33.6995, 73.0363]
    } className="map" zoom={12} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      items.map(items=>(
        <PIn key={items.id} items={items}/>
      ))
    }
  </MapContainer>
  
  )
}


export default Map
