import React from 'react'

const Recursive = ({ name, items }) => {
    const hasChildren = items && items.length
    return (
        <>
            <div>
                {name}
                <br/>
            </div>
            
            {hasChildren && items.map((item) => (
                <Recursive key={item.name} {...item} />
            ))}
        </>
    )
}

export default Recursive
