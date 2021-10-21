import { FETCH_3D_MODEL, SET_GISPARCEL_ID } from "../actions/types";

const initialState = {
    task_id: null,
    model_loaded: false,
    gisparcel_id: null,
}


export default function(state=initialState, action){
    switch(action.type) {
        case FETCH_3D_MODEL:
            return {
                ...state,
                task_id: action.payload,
                model_loaded: false,
                gisparcel_id: null
            }
        case SET_GISPARCEL_ID:
            return {
                ...state,
                gisparcel_id: action.payload,
                model_loaded: true
            }
        default:
            return state;
    }
}