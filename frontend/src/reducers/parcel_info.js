import { GET_PARCEL_INFO, SET_ADDRESS } from "../actions/types";

const initialState = {
    address: '210 Belmont Ave, Los Angeles, CA',
    parcel_info: {}
}

export default function(state = initialState, action){
    switch(action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        case GET_PARCEL_INFO:
            return {
                ...state,
                parcel_info: action.payload
            }
        default:
            return state;
    }
}