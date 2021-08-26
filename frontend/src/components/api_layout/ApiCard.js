import React from 'react'
import { useSelector } from 'react-redux';

const ApiCard = ({api_path}) => {

    const address = useSelector(state => state.parcel_info.address).replaceAll(' ', '+')
    const secret_key = useSelector(state => state.auth.key)


    return (
        <div className='api-card'>
            <div className='api-card-head'>
                <p>
                    /api/{api_path}/&lt;address&gt;
                </p>
            </div>
            <div className='curl-code'>
                {secret_key !== undefined 
                    ? 
                    <code>
                        curl -H "Authorization: Api-Key {secret_key}" https://www.parcelini.com/api/{api_path}/{address}
                    </code>
                    :
                    <code>
                        curl -H "Authorization: Api-Key &lt;YOUR_API_KEY&gt;" https://www.parcelini.com/api/{api_path}/{address}
                    </code>
                }
                
            </div>
        </div>
    )
}

export default ApiCard
