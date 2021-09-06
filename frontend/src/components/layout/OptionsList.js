import React from 'react'

const OptionsList = ({options}) => {
    return (
        <div>
        {options.map(option => (
            <ul>
            {/* Base Case */}
            {(option.subOptions.length > 0) &&
                <OptionsList
                options={option.subOptions}
                />
            }
            </ul>
        ))}
        </div>
    )
}

export default OptionsList
