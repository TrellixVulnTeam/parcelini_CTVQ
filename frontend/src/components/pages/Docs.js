import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../layout/Navbar';
import ApiCard from '../api_layout/ApiCard';
import { Link } from 'react-router-dom';

const Docs = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    return (
        <div>
            <div id='nav-header'>
                <Navbar/> 
            </div>
            {isAuthenticated ? 
            <div>
                <></>
            </div>
            :
                <Link to='/register' id='sign-up-btn'>Sign Up to get your Api-Key now</Link>
            }
            
            <ApiCard api_path='get_basic_info'/>
            <ApiCard api_path='get_zoning_info'/>
            <ApiCard api_path='get_parcel_polygon'/>
            <ApiCard api_path='get_backyard_polygon'/>
            <ApiCard api_path='get_hazard_analysis'/>
            <ApiCard api_path='get_front_street_details'/>
            <ApiCard api_path='get_parcel_sides'/>

        </div>
    )
}

export default Docs
