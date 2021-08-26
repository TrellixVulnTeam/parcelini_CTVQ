import React from 'react';
import Header from '../layout/Header';
import About from '../layout/About';
import Contact from '../layout/Contact';
// import Presentation from "./layout/Presentation";
// import Feature from "./layout/Feature";
import image_2d from './../../../static/images/g595.png';
import image_3d from './../../../static/images/g1653.png';
import image_planning from './../../../static/images/image658.png';


const Home = () => {
    return (
        <div>
            <Header/>
            {/* <Feature/> */}
            <About
                image={image_3d} 
                title='3D Attributes' 
                button='See how we do it'
                apis={[
                    'Ground Elevation Map', 
                    '3d models of Buildings and trees',
                    'Heights of Buildings and trees',
                    'Volumes of Buildings, pools, trees',
                    'Roof modelling of property'
                ]}
            />
            <About 
                image={image_2d} 
                title='2D Attributes' 
                
                apis={[
                    'Geometries of Blocks, Parcels, Buildings, Trees', 
                    'Geometries of Front, Back, Side Streets and Alleys',
                    'Geometries of Front, Back, Road Facing sides of Parcel ',
                    'Geometries of Frontyard, Backyard, Sideyard of Parcel',
                    'Corner Lot, Cul-de-sac, Hillside Parcel Detection'
                ]}
            />
            <About 
                image={image_planning} 
                title='Planning Attributes' 
                
                apis={[
                    'Zoning Information', 
                    'Utility Lines Information and Geometries',
                    'Hazard Analysis'
                ]}
            />
            {/* <Presentation/> */}
            {/* <Contact/> */}
        </div>
    )
}

export default Home
