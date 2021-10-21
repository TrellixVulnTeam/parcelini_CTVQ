import React from "react";
import { useState, useEffect, useRef } from "react";
import { getBasicInfo } from '../../actions/parcel_info';
import { fetch3dModel } from "../../actions/three";
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = ({search_type}) => {

    const dispatch = useDispatch();
    const [address, setAddress] = useState('');


    const mainAction = address => {
    return dispatch => {
        dispatch(getBasicInfo(address))
        dispatch(fetch3dModel(address))
      }
    }



    return (
        <div>
            <div id='address-bar'>
                <h3>Type any address in California</h3>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
                {
                    search_type === 'general' 
                    ? 
                    <button className="btn" onClick={(e) => dispatch(getBasicInfo(address))}><i className="fa fa-search"></i></button> 
                    :
                    <>
                    <button className="btn" onClick={(e) => dispatch(mainAction(address))}><i className="fa fa-search"></i></button> 
                    </>
                }
                
                <h6>Example: "1262 E Florida Pl, Anaheim, CA 92805, USA"</h6>
            </div>
        </div>
    )
}



export default SearchBar
