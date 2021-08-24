import React from "react";
import { useState, useEffect } from "react";
// import Collapsible from './../layout/Collapsible';
import MapPanel from "./maps/MapPanel";
import MapColoredSidesPanel from "./maps/MapColoredSidesPanel";
import MapListGeojson from "./maps/MapListGeojson";

function InfoPanel({displayInfo, colorCodedSides, backyard, buildingFootprints}) {

    const [showMap, setShowMap] = useState(false)
    const [showParcelPolygon, setShowParcelPolygon] = useState(false)
    const [showColoredSides, setShowColoredSides] = useState(false)
    const [showBackyard, setShowBackyard] = useState(false)
    const [showBuildingFootprints, setShowBuildingFootprints] = useState(false)

    const [currentInfo, setCurrentInfo] = useState({})
    const [parcelPolygon, setParcelPolygon] = useState(JSON.parse(displayInfo['polygon_details']['st_asgeojson']))

    const [baseInfo, setBaseInfo] = useState({
        'parcel_id': displayInfo['parcel_id'],
        'county': displayInfo['county_name'],
        'muni_name': displayInfo['muni_name'],
        'state_abbr': displayInfo['state_abbr'],
        'owner': displayInfo['owner'],
        'school_district': displayInfo['school_district'],
        'latitude': displayInfo['latitude'],
        'longitude':displayInfo['longitude'],
        'elevation': displayInfo['elevation'],
        'distance_from_coast': displayInfo['distance_from_coast_miles']
    });

    const [zoneInfo, setZoneInfo] = useState(displayInfo['zoning_details']);
    const [otherInfo, setOtherInfo] = useState(displayInfo['scraped_details']);
    const [centerPosition, setCenterPosition] = useState([parseFloat(displayInfo['latitude']),parseFloat(displayInfo['longitude'])]);

    



    const displayBaseInfo = () => {
        setShowMap(false)
        setCurrentInfo(baseInfo)
    }

    const displayZoneInfo = () => {
        setShowMap(false)
        setCurrentInfo(zoneInfo)
    }

    const displayOtherInfo = () => {
        setShowMap(false)
        setCurrentInfo(otherInfo)
    }

    const displayParcelPolygon = () => {
        setShowMap(true)
        setShowColoredSides(false)
        setShowBackyard(false)
        setShowBuildingFootprints(false)
        setShowParcelPolygon(true)

    }
    const displayColorCodedSides = () => {
        setShowMap(true)
        setShowBackyard(false)
        setShowParcelPolygon(false)
        setShowBuildingFootprints(false)
        setShowColoredSides(true)
        

    }

    const displayBackyard = () => {
        setShowMap(true)
        setShowColoredSides(false)
        setShowParcelPolygon(false)
        setShowBuildingFootprints(false)
        setShowBackyard(true)
    }

    const displayBuildingFootprints = () => {
        setShowMap(true)
        setShowColoredSides(false)
        setShowParcelPolygon(false)
        setShowBackyard(false)
        setShowBuildingFootprints(true)
    }



    return (

        <div id='panel'>
            <div id='infotypes'>
                <button onClick={displayBaseInfo}>Basic Info</button>
                <button onClick={displayZoneInfo}>Zoning Info</button>
                <button onClick={displayOtherInfo}>Property Info</button>
                {(Object.keys(parcelPolygon).length != 0) ? <button onClick={displayParcelPolygon}>Parcel Polygon</button> : <></>}
                {(Object.keys(colorCodedSides).length != 0) ? <button onClick={displayColorCodedSides}>Parcel Sides</button> : <></>}
                {/* {(Object.keys(backyard).length != 0) ? <button onClick={displayBackyard}>Backyard</button> : <></>} */}
                {/* {(Object.keys(buildingFootprints).length != 0) ? <button onClick={displayBuildingFootprints}>Building Footprints</button> : <></>} */}
                
                
                
            </div>
            <div id='displaybox'>
                {
                    showMap ? 
                        showParcelPolygon ?
                            <div className='info-content'> 
                                <MapPanel parcelPolygon={parcelPolygon} position={centerPosition}/>
                            </div>
                        :
                            showColoredSides ?
                                <div className='info-content'> 
                                    <MapColoredSidesPanel geojson={colorCodedSides} position={centerPosition} />
                                </div>
                            :
                                showBackyard ?
                                    <div className='info-content'> 
                                        <MapPanel parcelPolygon={backyard} position={centerPosition} />
                                    </div>
                                :
                                    <div className='info-content'> 
                                        <MapListGeojson listPolygons={buildingFootprints} position={centerPosition} />
                                    </div>
                    :
                    <div className='info-content'> 
                        { Object.keys(currentInfo).map( (key)=> <div><span> <span className='key'>{key}</span> : <span>{JSON.stringify(currentInfo[key])}</span> </span></div> )}
                    </div>
                }
                
            </div>
        </div>
    )
}

export default InfoPanel
