import React from "react";
import { useState } from "react";
import { getBasicInfo } from '../../actions/parcel_info';
import { useDispatch } from 'react-redux';

const SearchBar = () => {

    const dispatch = useDispatch();
    const [address, setAddress] = useState('')
    return (
        <div>
            <div id='address-bar'>
                <h3>Type any address in California</h3>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
                <button className="btn" onClick={(e) => dispatch(getBasicInfo(address))}><i className="fa fa-search"></i></button>
                <h6>Example: "1262 E Florida Pl, Anaheim, CA 92805, USA"</h6>
            </div>
        </div>
    )
}

export default SearchBar
