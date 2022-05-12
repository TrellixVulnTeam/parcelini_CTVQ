import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Header = () => {
    return (
        <div id='main'>
            <Navbar/>
            <div className='name'>
                <h1>
                    <span>Simplified</span> Analysing Land Use Patterns Across the World
                </h1>
                <p className='details'></p>
                <Link to='/tool' className='cv-btn'>Explore</Link>
            </div>
        </div>
    )
}

export default Header
