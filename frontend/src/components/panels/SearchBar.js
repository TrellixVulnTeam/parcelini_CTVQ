import React from "react";
import { useState } from "react";
function SearchBar({onSearch}) {

    const [address, setAddress] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!address) {
            alert('Please Enter a valid address')
            return
        }

        onSearch(address)
        setAddress('')
        
    }

    return (
        <div>
            <form id='address-bar'>
                <h3>Type any address in California</h3>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
                <button className="btn" onClick={onSubmit}><i className="fa fa-search"></i></button>
                <h6>Example: "775 Hamilton Ave, Palo Alto, CA"</h6>
            </form>
        </div>
    )
}

export default SearchBar
