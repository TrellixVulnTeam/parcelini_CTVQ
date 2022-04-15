import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserUsedAddresses } from "../../../actions/auth";

const Addresses = () => {

    const dispatch = useDispatch();
    const username = useSelector(state => state.auth.user.username)
    

    useEffect(() => {
        dispatch(getUserUsedAddresses(username))
    },[])

    const user_used_addresses = useSelector(state => state.auth.userUsedAddresses)

    


    return (
        <table className='history-table'>
            <th>
                Address
            </th>
            <th>
                Price
            </th>
            {user_used_addresses.map(data => (
                <tr>
                    <td>{data.address}</td>
                    <td>$2</td>
                </tr>
                
                
            ))}
        </table>
    )
}

export default Addresses