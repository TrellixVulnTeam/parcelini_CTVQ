
import React from "react";
// import { useState } from "react"
import { MapContainer, TileLayer, useMap, Polygon, GeoJSON } from 'react-leaflet';
import { useSelector } from "react-redux";


const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}




const MapColoredSidesPanel = ({geojson}) => {

    const onEachSide = (side, layer) => {
        layer.setStyle({ color: side.properties.color_code})
        layer.bindPopup(side.properties.side)
    }

    const lat = useSelector(state => parseFloat(state.parcel_info.basic_info.latitude))
    const lng = useSelector(state => parseFloat(state.parcel_info.basic_info.longitude))
    const position = [lat, lng]


    return (

        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} id="map">
                <ChangeView center={position} zoom={18} /> 
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* { typeof parcelPolygon === 'undefined' ? null : <Polygon pathOptions={purpleOptions} positions={parcelPolygon} /> } */}
                { typeof geojson === 'undefined' ? null : <GeoJSON data={geojson} onEachFeature={onEachSide}/> }
                
            </MapContainer>
        </div>
        
    )
}

export default MapColoredSidesPanel
