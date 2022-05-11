import React from "react";
import { useState, useEffect, useRef } from "react";
import { getBasicInfo } from '../../actions/parcel_info';
import { fetch3dModel } from "../../actions/three";
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from "react-google-autocomplete";

const SearchBar = ({search_type}) => {

    const dispatch = useDispatch();
    const [address, setAddress] = useState('');

    


    // const user = useSelector(state => state.auth.user)

    const username = 'test1';



    const mainAction = (address, username) => {
    return dispatch => {
        dispatch(getBasicInfo(address, username))
        // dispatch(fetch3dModel(address))
      }
    }



    return (
        <div>
            <div id='address-bar'>
                <h3>Type any address in California</h3>
                {/* <Autocomplete
                    apiKey={'AIzaSyA9Pbdvi0ZytU-uuyBHy7alZ_g4JV__J-A'}
                    onPlaceSelected={(place) => {
                        dispatch(mainAction(place));
                    }}
                /> */}
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
                {
                    search_type === 'general' 
                    ? 
                    <button className="btn" onClick={(e) => dispatch(getBasicInfo(address, username))}><i className="fa fa-search"></i></button> 
                    :
                    <>
                    <button className="btn" onClick={(e) => dispatch(mainAction(address, username))}><i className="fa fa-search"></i></button> 
                    </>
                }
                
                <h6>Example: "1262 E Florida Pl, Anaheim, CA 92805, USA"</h6>
            </div>
        </div>
    )
}



export default SearchBar
