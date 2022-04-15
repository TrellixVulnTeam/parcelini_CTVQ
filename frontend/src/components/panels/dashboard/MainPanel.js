import React from 'react';
import { useState } from 'react'
import History from './History';
import Addresses from './Addresses';

const MainPanel = ({role}) => {
  
    switch(role) {
        case 'history':
            return <div>
                <History />
            </div>
        case 'addresses':
            return <div>
                <Addresses />
            </div>
        default:
            return <div></div>
    }

}

export default MainPanel