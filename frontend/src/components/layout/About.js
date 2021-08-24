import React from 'react'

const About = (props) => {
    const listItems = props.apis.map((api) =>
        <li className='api-item'>{api}</li>
    );

    return (
        <div id='about'>
            <div className='about-image'>
                <img src={props.image} alt=''/>
            </div>
            <div className='about-text'>
                <h2> {props.title} </h2>
                {/* <p> dfadsfadsf </p> */}
                <ul>
                    {listItems}
                </ul>
                {(props.button !== undefined) ? 
                    <a href="/models"><button> {props.button} </button></a>
                    : <span/>
                }
            </div>
        </div>
    )
}

export default About
