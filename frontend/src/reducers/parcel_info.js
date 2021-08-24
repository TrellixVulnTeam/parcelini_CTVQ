import { GET_PARCEL_INFO } from "../actions/types";

const initialState = {
    parcel_info: {}
}

export default function(state = initialState, action){
    switch(action.type) {
        case GET_PARCEL_INFO:
            return {
                ...state,
                parcel_info: action.payload
            }
        default:
            return state;
    }
}