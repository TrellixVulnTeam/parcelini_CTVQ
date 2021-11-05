import React from 'react';
import { useSelector } from 'react-redux';
import JsonPrettyPrint from '../layout/JsonPrettyPrint';
import JSONPretty from 'react-json-pretty';
import MapPanel from './maps/MapPanel';
import MapColoredSidesPanel from './maps/MapColoredSidesPanel';
import Loader from "react-loader-spinner";


const DisplayBox = ({role}) => {

    const { 
        basic_info, 
        zoning_info, 
        parcel_polygon, 
        backyard_polygon, 
        hazard_analysis,
        parcel_sides
    } = useSelector(state => state.parcel_info)

    const {model_loaded, gisparcel_id, area_na} = useSelector(state => state.three)

    switch(role) {
        case 'basic':
            return <div className='info-content'>
                <JSONPretty id="json-pretty" data={basic_info}/>
            </div>
        case '3d':
            return (
                <div className='info-content'>
                    { model_loaded ? 
                        <a href={`/view_model/${gisparcel_id}`} target="_blank"> View 3D model of the property </a>
                    :
                    area_na ?
                      <>3D model not available for this area. Please try another address.</>
                    :
                    <div className='loader'>
                    <p>Checking Availability of 3D model in this area</p>
                    <Loader
                    type="Bars"
                    color="#00b7ff"
                    height={50}
                    width={50}/>
                    </div>
                    }
                </div>
            )
                
        case 'zoning':
            return <div className='info-content'>
                <JsonPrettyPrint data={zoning_info}/>
            </div>
        case 'parcel_polygon':
            return <div className='info-content'>
                <MapPanel parcelPolygon={parcel_polygon}/>
            </div>
        case 'backyard_polygon':
            return <div className='info-content'>
                <></>
                <MapPanel parcelPolygon={backyard_polygon}/>
            </div>
        case 'hazard_analysis':
            return <div className='info-content'>
                <></>
                <JSONPretty id="json-pretty" data={hazard_analysis}/>
            </div>
        case 'parcel_sides':
            return <div className='info-content'>
                <></>
                <MapColoredSidesPanel geojson={parcel_sides}/>
            </div>
        default:
            return <div className='info-content'></div>
    }
}

export default DisplayBox
