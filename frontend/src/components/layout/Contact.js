import React from 'react';
import { useState } from 'react';
import { establishContact } from '../../actions/contact';
import { useDispatch } from 'react-redux';

const Contact = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    

    return (
        <div id='contact'>
            <h3>Mail us at info@parcelini.com</h3>
            {/* <div className='contact-message'>
                <textarea type='text' placeholder='Your Message' onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <div className='contact-input'>
                <input type='email' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)}/>
                <a onClick={(e) => dispatch(establishContact(message, email))}>Send</a>
            </div> */}
        </div>
    )
}

export default Contact
