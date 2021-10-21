import React from 'react'
import Navbar from '../layout/Navbar'
import SearchBar from '../panels/SearchBar'
import { useSelector, useDispatch } from 'react-redux'


const Solar = () => {

    const currentState = useSelector(state => state.three.model_current_status)
    const taskID = useSelector(state => state.three.task_id)

    return (
        <div>
            <div id='nav-header'>
                <Navbar/>
                <div id='search-bar'>
                    <SearchBar/>
                </div>
                { currentState }task
                <p>{ taskID }</p>
            </div>
            
        </div>
    )
}

export default Solar
