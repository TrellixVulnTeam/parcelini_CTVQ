import React from "react";
import { useState } from "react";
import SearchBar from './../panels/SearchBar';
// import InfoPanel from './../panels/InfoPanel';
import Loader from "react-loader-spinner";
import Navbar from "../layout/Navbar";
import DisplayPanel from "../panels/DisplayPanel";
import { useSelector } from "react-redux";

const Playground = () => {

    const {showLoader, showDisplayPanel} = useSelector(state => state.parcel_info)

    return (

          <div>
            This page is under construction. It will be back within a week.
          </div>
          // <div id='tool-main'>
          //   <div id='page-header'>
          //     <Navbar/>
          //     <div id='search-bar'>
          //       <SearchBar/>
          //     </div>
          //   </div>

          //   { showLoader ? 
          //   <div className='loader'>
          //     <Loader
          //     type="TailSpin"
          //     color="#00b7ff"
          //     height={100}
          //     width={100}/>
          //   </div>
          //   :
          //     showDisplayPanel ?
          //       <div id ='info-panel'>
          //         <DisplayPanel/>
          //       </div>
          //     :
          //     <></>
          //   }
            
          // </div>
        
      );
    }


export default Playground;
