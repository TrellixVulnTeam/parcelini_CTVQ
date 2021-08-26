import React from 'react'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../layout/Navbar';
// import ApiCard from '../api_layout/ApiCard';

function Dashboard(props) {

    // const { key } = useSelector(state => state.key)

    return (
        <div>
            <div id='nav-header'>
                <Navbar/> 
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
