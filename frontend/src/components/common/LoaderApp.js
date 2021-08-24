import React from 'react'
import Loader from "react-loader-spinner";


const LoaderApp = () => {
    return (
        <div>
            <Loader
            type="ThreeDots"
            color="#00b7ff"
            height={300}
            width={300}
            />
        </div>
    )
}

export default LoaderApp
