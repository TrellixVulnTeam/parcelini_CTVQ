 import React from 'react'
 import FeatureBox from './FeatureBox'
 import featureimage from '../../../static/images/feature_1.png'
 import featureimage1 from '../../../static/images/feature_2.png'
 import featureimage2 from '../../../static/images/feature_3.png'


 const Feature = () => {
     return (
         <div id='features'>
             <div className='a-container'>
                
                <FeatureBox image={featureimage1} title='Number of Structures'/>
                <FeatureBox image={featureimage} title='Height of Structures'/>
                <FeatureBox image={featureimage2} title='Trees on Structures'/>
             </div>
         </div>
     )
 }
 
 export default Feature
 