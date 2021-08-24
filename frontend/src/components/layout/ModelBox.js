import React from 'react'

const ModelBox = (model_id) => {
    return (
        <script type='application/vnd.jupyter.widget-view+json' dangerouslySetInnerHTML={ { __html: `{
            "model_id": "${model_id}"
        }`}} />
    )
}

export default ModelBox
