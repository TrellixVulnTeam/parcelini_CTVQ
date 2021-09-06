import React from 'react'
import { useState } from 'react'

const JsonPrettyPrint = ({data}) => {


    


    
    return (
    
    // <div><pre>{ JSON.stringify(data, null, 2) }</pre></div>
    <div className='info-content'> 
    { Object.keys(data).map( (key)=> <div><span> <span className='key'>{key}</span> : <span>{JSON.stringify(data[key])}</span> </span></div> )}
    </div>
    
    )
}

export default JsonPrettyPrint
