import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getHistory } from "../../../actions/auth";

const History = () => {
    const username = useSelector(state => state.auth.user.username)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistory(username))
    },[])

    const history = useSelector(state => state.auth.userHistory)

    

    return (
        
        <table className='history-table'>
            <tr>
                <th>Address</th>
                <th>API_TYPE</th>
                <th>Time</th>
            </tr>
            {history.map(data => (
                <tr>
                    <td>{data.address}</td>
                    <td>{data.api_name}</td>
                    <td>{data.created_date}</td>
                </tr>
                
            ))}
        </table>
        )
}

export default History