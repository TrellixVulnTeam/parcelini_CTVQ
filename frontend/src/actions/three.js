import axios from "axios";

import { 
    FETCH_3D_MODEL,
    SET_GISPARCEL_ID,
    SET_STATUS,
    AREA_NA_3D
} from "./types";


export const fetch3dModel = (address) => dispatch => {

    console.log(address);

    // dispatch({
    //     type: SET_ADDRESS,
    //     payload: address
    // });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    config.headers['Authorization'] = 'Api-Key IkoP9g2r.DgFLr6CdVhM4uGtukRWxVH4ysDXPQ5UH'

    let task_id = null

    axios.get(`/models/fetch_3d_model/${address.replaceAll(' ', '+')}`, config)
      .then(res => {
        task_id = res.data
          dispatch({
              type: FETCH_3D_MODEL,
              payload: res.data
          });
        console.log('First Step Done')
        const checkStatus = (task_id) => {
          console.log('Checking Status')
          axios.get(`/models/check_3d_status/${task_id}`, config)
          .then(res => {
            dispatch({
              type: SET_STATUS,
              payload: res.data
            });
            if(res.data == 'PENDING'){
              console.log('Still Pending')
              checkStatus(task_id)
            }
            else {
              if(res.data.includes('model')){
                dispatch({
                  type: SET_GISPARCEL_ID,
                  payload: res.data.split("_")[1]
                });
              } else {
                dispatch({
                  type: AREA_NA_3D
                });
              }
              
            }
          })
        }
        checkStatus(task_id)
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

}