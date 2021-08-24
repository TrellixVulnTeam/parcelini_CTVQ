import React from "react";
import { useState } from "react";
import SearchBar from '../panels/SearchBar';
import InfoPanel from '../panels/InfoPanel';
import Loader from "react-loader-spinner";
import Navbar from "../layout/Navbar";
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getParcelInfo } from "../../actions/parcel_info";


const Playground = (props) => {




    // const url = 'http://127.0.0.1:8000/'
    // const url = 'https://defineapoorv.pythonanywhere.com/'
    const url = 'https://protected-peak-85531.herokuapp.com'
  
    const [showSpinner, setSpinnerState] = useState(false)
    // const [baseInfo, setBaseInfo] = useState({})
    const [colorCodedSides, setColorCodedSides] = useState({})
    const [backyard, setBackyard] = useState({})
    const [buildingFootprints, setBuildingFootprints] = useState({})
    // const [zoningInfo, setZoningInfo] = useState({})
    // const [neighborhoodInfo, setNeighborhoodInfo] = useState({})
    // const [parcelPolygon, setParcelPolygon] = useState([])
    // const [position, setPosition] = useState([49.2597, -123.11683])


    console.log(Object.keys(props.baseInfo).length)




    const onSearch = async (address) => {

        setSpinnerState(true);

        console.log(address)


        props.getParcelInfo(address);




        axios.post(`${url}/get_color_coded_sides`, {
          address: address,
        })
        .then(function (response) {
          // console.log(response.data)
          setColorCodedSides(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.post(`${url}/get_backyard_polygon`, {
          address: address,
        })
        .then(function (response) {
          // console.log(response.data)
          setBackyard(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });


        axios.post(`${url}/get_mapbox_building_footprints_validated`, {
          address: address,
        })
        .then(function (response) {
          // console.log(response.data)
          setBuildingFootprints(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });


        
        setSpinnerState(false);
    
    
      }

    return (
          <div id='tool-main'>
            <div id='page-header'>
              <Navbar/>
              <div id='search-bar'>
                <SearchBar onSearch={onSearch}/>
              </div>
            </div>

            


            <div>
              {Object.keys(props.baseInfo).length == 0 ? 
              
              (showSpinner
                ? 
                <div>
                    
                    <div id='loader'>
                        Hello
                        <Loader
                        type="Grid"
                        color="#00b7ff"
                        height={100}
                        width={100}
                        />
                    </div>
                </div>
                : null
              )
            : 
            <div>

              <div id ='info-panel'>
                <InfoPanel displayInfo={props.baseInfo} colorCodedSides={colorCodedSides} backyard={backyard} buildingFootprints={buildingFootprints}/>
              </div>
            </div>
            }

            </div>

            

          </div>
        
      );
    }

Playground.propTypes = {
  baseInfo: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { baseInfo: state.parcel_info.parcel_info }
}

export default connect(mapStateToProps, { getParcelInfo })(Playground);
