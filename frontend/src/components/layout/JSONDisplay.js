import React from 'react'
import JSONPretty from 'react-json-pretty'


const JSONDisplay = () => {
    const toppingOptions = [
        {
          name: "Pepperoni",
          id: "pepperoni-id",
          subOptions: [
            {
              name: "Spicy",
              id: "spicy-id",
              subOptions: []
            },
            {
              name: "Regular",
              id: "regular-id",
              subOptions: []
            }
          ]
        },
        {
          name: "Chicken",
          id: "chicken-id",
          subOptions: [
            {
              name: "Buffalo",
              id: "buffalo-id",
              subOptions: [
                {
                  name: "Mild",
                  id: 'mild-id',
                  subOptions: [],
                },
                {
                  name: "Hot",
                  id: 'hot-id',
                  subOptions: [
                    {
                      name: 'Jalapeño',
                      id: 'jalapeno-id',
                      subOptions: []
                    },
                    {
                      name: 'Cayenne',
                      id: 'cayenne-id',
                      subOptions: []
                    }
                  ],
                },
              ]
            },
            {
              name: "BBQ",
              id: 'bbq-id',
              subOptions: [],
            }
          ]
        },
      ]
      
    return (
        <div>
            <JSONPretty id="json-pretty" data={toppingOptions}></JSONPretty>
       </div>
    )
}

export default JSONDisplay
