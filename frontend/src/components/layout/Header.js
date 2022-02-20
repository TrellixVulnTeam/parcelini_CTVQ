import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Header = () => {
    return (
        <div id='main'>
            <Navbar/>
            <div className='name'>
                <h1>
                    <span>Understanding</span> Zoning data for any parcel
                </h1>
                <p className='details'> We are making life of Architects Easier</p>
                <Link to='/tool' className='cv-btn'>Explore</Link>
            </div>
        </div>
    )
}

export default Header
