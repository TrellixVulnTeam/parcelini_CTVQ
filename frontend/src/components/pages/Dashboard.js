import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../layout/Navbar';
import MainPanel from '../panels/dashboard/MainPanel';
// import ApiCard from '../api_layout/ApiCard';

function Dashboard(props) {

    const username = useSelector(state => state.auth.user.username)
    const [role, setRole] = useState('');


    return (
        <div>
            <div id='nav-header'>
                <Navbar/> 
            </div>
            {/* <div className='general-text'>
                <b>User:</b> { username }
            </div> */}
            <div id='dashboard'>
                <div id='side-panel'>
                    <div className='side-panel-nav' onClick={() => {setRole('history')}}>
                        History
                    </div>
                    <div className='side-panel-nav' onClick={() => {setRole('addresses')}}>
                        Addresses
                    </div>
                </div>
                <div id='main-panel'>
                    <MainPanel role={role}/>
                </div>
            </div>
            
            {/* <div className='secret-key'>
                <span>Secret Key: </span> { (props.auth.key !== undefined) ? <span className='access-key'> {props.auth.key} </span> : <></>}
            </div> */}
            {/* <ApiCard api_path='parcel_info'/> */}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)
