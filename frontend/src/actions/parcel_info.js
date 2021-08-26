import axios from "axios";

import { GET_ERRORS, GET_PARCEL_INFO, SET_ADDRESS } from "./types";
const url = 'https://protected-peak-85531.herokuapp.com'

export const getParcelInfo = (address) => dispatch => {
    dispatch({
        type: SET_ADDRESS,
        payload: address
    });
    axios.post(`${url}/parcel_info`, {
        address: address,
      })
      .then(res => {
          dispatch({
              type: GET_PARCEL_INFO,
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
              type: GET_ERRORS,
              payload: errors
          })
      });
      
}