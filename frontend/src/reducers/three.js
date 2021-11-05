import { FETCH_3D_MODEL, SET_GISPARCEL_ID, SET_STATUS, AREA_NA_3D } from "../actions/types";

const initialState = {
    task_id: null,
    model_loaded: false,
    gisparcel_id: null,
    status: null,
    area_na: false
}


export default function(state=initialState, action){
    switch(action.type) {
        case FETCH_3D_MODEL:
            return {
                ...state,
                task_id: action.payload,
                model_loaded: false,
                gisparcel_id: null,
                status: null,
                area_na: false
            }
        case SET_GISPARCEL_ID:
            return {
                ...state,
                gisparcel_id: action.payload,
                model_loaded: true
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case AREA_NA_3D:
            return {
                ...state,
                area_na: true
            }
        default:
            return state;
    }
}