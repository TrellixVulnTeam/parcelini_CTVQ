import React from 'react';
import Header from '../layout/Header';
import About from '../layout/About';
import Contact from '../layout/Contact';
import image_2d from './../../../static/images/g595.png';
import image_3d from './../../../static/images/g1653.png';
import image_planning from './../../../static/images/image658.png';

import image_geometry from './../../../static/images/frontpage_images/geometry.jpg';
import image_zoning from './../../../static/images/frontpage_images/zoning.jpeg';
import image_hazard from './../../../static/images/frontpage_images/flood.jpg';
// import image_geometry from './../../../static/images/frontpage_images/geometry.jpg';
// import image_geometry from './../../../static/images/frontpage_images/geometry.jpg';

import Presentation from '../layout/Presentation';
import Feature from '../layout/Feature';

const Home = () => {

    const geometry_api_sample = {
        "parcel_polygon" : '{\"type\":\"MultiPolygon\",\"coordinates\":[[[[-122.10071254,37.6602567],...........[-122.10078658859,37.660453906098]]]]}',
        "number_of_buildings": 2,
        "building_polygons" : [
            {
                "type": "primary",
                "area": 12.34,
                "height": 16,
                "geometry": '{\"type\":\"MultiPolygon\",\"coordinates\":[[[[-122.10172365,37.6504123],...........[-122.100757749,37.66045077]]]]}',
            },
            {
                "type": "accessory",
                "area": 8.64,
                "height": 12,
                "geometry": '{\"type\":\"MultiPolygon\",\"coordinates\":[[[[-122.10075541,37.65042312],...........[-122.10078652244,37.660453977234]]]]}',
            }
        ],
        "pool_present" : true,
        "pool_polygon" : [
            {
                "area": 4.64,
                "geometry": '{\"type\":\"MultiPolygon\",\"coordinates\":[[[[-122.100774532,37.6602334],...........[-122.10078655812,37.6604539025672]]]]}',
            }
        ]
    }

    const zoning_api_sample = {
        "jurisdiction": "City of Santa Barbara",
        "zone" : "R-1",
        "description" : "Single Family Residential",
        "overlay": null
    }

    const hazard_api_sample = {
        "earthquake_hazard":
            {
                "fault_zone": null,
                "landslide_zone": null,
                "liquefaction_zone": 
                {
                    "objectid": "2531",
                    "quad_name": "Palo Alto",
                    "released": "2006-10-18",
                    "revised": "N",
                    "prev_dates": null,
                    "geopdflink": "http://gmw.conservation.ca.gov/SHP/.....",
                    "reportlink": "http://gmw.conservation.ca.gov/SHP/.....",
                    "comments": null,
                    "creation_d": "1471454449000",
                    "revision_d": "1487239608000"
                },
                "landslide_and_liquefaction_zone": null,
                "unevaluated_zone": false
    
            },
            "flood_risk":
                {
                    "100_year_flooplain":false,
                    "200_year_floodplain": true,
                    "500_year_floodplain": true
                },
            "fire_severity_zone": {
                "sra": "LRA",
                "incorp": "Y",
                "haz_code": -2,
                "haz_class": "Urban Unzoned",
                "vh_rec": null
            },
            "coastal_zone" : null,
        }

    return (
        <div>
            <Header/>
            {/* <Feature/> */}
            <About
                image={image_geometry} 
                title='Geometry Data' 
                // button='See how we do it'
                data={geometry_api_sample}
            />
            <About
                image={image_zoning} 
                title='Zoning Data' 
                data={zoning_api_sample}
            />
            <About 
                image={image_hazard} 
                title='Hazards Analysis' 
                data={hazard_api_sample}
            />
            {/* <Presentation/> */}
            <Contact/>
        </div>
    )
}

export default Home
