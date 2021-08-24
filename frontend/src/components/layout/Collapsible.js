import React from "react";
import { useState } from "react";

const Collapsible = ({title, info}) => {

    const [open, setOpen] = useState(false)

    return (
        <div className='collapsible'>
            <div onClick={()=>setOpen(!open)} className='info-header'>
                {title}
            </div>
            {open ? ( <div className='info-content'> 
            { Object.keys(info).map( (key)=> <div><span> {key} : {JSON.stringify(info[key])} </span></div> )}
            </div> ) : null}
        </div>
    )
}

export default Collapsible
