import React from 'react'
import DisplayBox from './DisplayBox'
import { useState } from 'react'
import { useSelector } from 'react-redux'


const DisplayPanel = () => {

    const [role, setRole] = useState('');
    const { 
        basic_info, 
        zoning_info, 
        parcel_polygon, 
        backyard_polygon, 
        hazard_analysis,
        parcel_sides
    } = useSelector(state => state.parcel_info)

    console.log(backyard_polygon)


    return (
        <div id='panel'>
            <div id='infotypes'>
            <button onClick={() => {setRole('basic')}}>Basic Info</button>
            <button onClick={() => {setRole('zoning')}}>Zoning Info</button>
            <button onClick={() => {setRole('parcel_polygon')}}>Parcel Polygon</button>
            { (Object.keys(backyard_polygon).length === 0 && backyard_polygon.constructor === Object) ? 
                <></>
            :   <button onClick={() => {setRole('backyard_polygon')}}>Backyard Polygon</button>

            }
            
            <button onClick={() => {setRole('hazard_analysis')}}>Hazard Analysis</button>
            <button onClick={() => {setRole('parcel_sides')}}>Parcel Sides</button>
            </div>
            <div id='displaybox'>
                <DisplayBox role={role}/>
            </div>
        </div>
    )
}


  

export default DisplayPanel
