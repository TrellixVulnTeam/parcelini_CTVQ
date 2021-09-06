import { 
    GET_BASIC_INFO, 
    SET_ADDRESS, 
    GET_ZONING_INFO, 
    GET_PARCEL_POLYGON, 
    GET_BACKYARD_POLYGON, 
    GET_HAZARD_ANALYSIS,
    GET_PARCEL_SIDES,
    HIDE_LOADER
} from "../actions/types";

const initialState = {
    address: '210 Belmont Ave, Los Angeles, CA',
    showLoader: false,
    showDisplayPanel: false,
    basic_info: {},
    zoning_info: {},
    parcel_polygon: {},
    backyard_polygon: {},
    hazard_analysis: {},
    parcel_sides: {}
    
}

export default function(state = initialState, action){
    switch(action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload,
                showLoader: true,
                basic_info: {},
                zoning_info: {},
                parcel_polygon: {},
                backyard_polygon: {},
                hazard_analysis: {},
                parcel_sides: {}
            }
        case GET_BASIC_INFO:
            return {
                ...state,
                basic_info: action.payload,
                showLoader: false,
                showDisplayPanel: true
            }
        case GET_ZONING_INFO:
            return {
                ...state,
                zoning_info: action.payload
            }
        case GET_PARCEL_POLYGON:
            return {
                ...state,
                parcel_polygon: action.payload
            }
        case GET_BACKYARD_POLYGON:
            return {
                ...state,
                backyard_polygon: action.payload
            }
        case GET_HAZARD_ANALYSIS:
            return {
                ...state,
                hazard_analysis: action.payload
            }
        case GET_PARCEL_SIDES:
            return {
                ...state,
                parcel_sides: action.payload
            }
        case HIDE_LOADER:
            return {
                ...state,
                showLoader: false
            }
        default:
            return state;
    }
}