import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "axios";
import { createMessage, returnErrors } from "./messages";

import { USER_LOADED, USER_LOADING, AUTH_ERROR, GET_ERRORS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_HISTORY, USER_USED_ADDRESSES } from "./types";


// CHECK token, load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING})

    axios.get('/api/auth/userkey', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })

}


export const getHistory = (username) => dispatch => {
    axios.get(`/api/${username}/usage`)
        .then(res => {
            dispatch({
                type: USER_HISTORY,
                payload: res.data
            })
        })
}

export const getUserUsedAddresses = (username) => dispatch => {
    axios.get(`/api/${username}/user_addresses`)
        .then(res => {
            dispatch({
                type: USER_USED_ADDRESSES,
                payload: res.data
            })
        })
}



export const login = (username, password) => dispatch => {
    dispatch({ type: USER_LOADING})
 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password })


    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}



export const register = ({ username, password, email }) => dispatch => {
    dispatch({ type: USER_LOADING})
 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, email, password })


    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}






export const logout = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING})
    

    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}


// Setup config with token - helper

export const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}