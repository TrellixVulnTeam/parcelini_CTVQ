import axios from "axios";

import { 
    GET_ERRORS, 
    GET_BASIC_INFO, 
    SET_ADDRESS, 
    GET_ZONING_INFO, 
    GET_PARCEL_POLYGON, 
    GET_BACKYARD_POLYGON, 
    GET_HAZARD_ANALYSIS,
    GET_PARCEL_SIDES,
    HIDE_LOADER
} from "./types";

export const getBasicInfo = (address, username) => dispatch => {

    console.log(address);

    dispatch({
        type: SET_ADDRESS,
        payload: address
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    config.headers['Authorization'] = 'Api-Key IFRktHYL.8DPnj1ylzUWnihXfwu2CDc2BkCRdu5dp'

    axios.get(`/api/${username}/get_basic_info/${address.replaceAll(' ', '+')}`, config)
      .then(res => {
          dispatch({
              type: GET_BASIC_INFO,
              payload: res.data
          });
      })
      .catch(err => {
          const errors = {
              msg: {
                  message: 'Please use a correct California address'
              },
              status: err.response.status
          }
          dispatch({
              type: HIDE_LOADER,
          })
          dispatch({
              type: GET_ERRORS,
              payload: errors
          })
      });


      axios.get(`/api/${username}/get_zoning_info/${address.replaceAll(' ', '+')}`, config)
      .then(res => {
          dispatch({
              type: GET_ZONING_INFO,
              payload: res.data
          });
      })
      .catch(err => {
          const errors = {
              msg: {
                  message: 'Please use a correct California address'
              },
              status: err.response.status
          }
          // dispatch({
          //     type: GET_ERRORS,
          //     payload: errors
          // })
      });


      axios.get(`/api/${username}/get_parcel_polygon/${address.replaceAll(' ', '+')}`, config)
      .then(res => {
          dispatch({
              type: GET_PARCEL_POLYGON,
              payload: res.data
          });
      })
      .catch(err => {
          const errors = {
              msg: {
                  message: 'Please use a correct California address'
              },
              status: err.response.status
          }
          // dispatch({
          //     type: GET_ERRORS,
          //     payload: errors
          // })
      });

      axios.get(`/api/${username}/get_backyard_polygon/${address.replaceAll(' ', '+')}`, config)
      .then(res => {
          dispatch({
              type: GET_BACKYARD_POLYGON,
              payload: res.data
          });
      })
      .catch(err => {
          const errors = {
              msg: {
                  message: 'Please use a correct California address'
              },
              status: err.response.status
          }
          // dispatch({
          //     type: GET_ERRORS,
          //     payload: errors
          // })
      });


      axios.get(`/api/${username}/get_hazard_analysis/${address.replaceAll(' ', '+')}`, config)
      .then(res => {
          dispatch({
              type: GET_HAZARD_ANALYSIS,
              payload: res.data
          });
      })
      .catch(err => {
          const errors = {
              msg: {
                  message: 'Please use a correct California address'
              },
              status: err.response.status
          }
          // dispatch({
          //     type: GET_ERRORS,
          //     payload: errors
          // })
      });


      axios.get(`/api/${username}/get_parcel_sides/${address.replaceAll(' ', '+')}`, config)
      .then(res => {
          dispatch({
              type: GET_PARCEL_SIDES,
              payload: res.data
          });
      })
      .catch(err => {
          const errors = {
              msg: {
                  message: 'Please use a correct California address'
              },
              status: err.response.status
          }
          // dispatch({
          //     type: GET_ERRORS,
          //     payload: errors
          // })
      });

      
}