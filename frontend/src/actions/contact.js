import axios from "axios";
import { createMessage, returnErrors } from "./messages";


export const establishContact = (message, email) => dispatch => {
    const body = JSON.stringify({ message, email })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post('/contacts/', body, config)
      .then(res => {

          dispatch(createMessage({ passwordNotMatch: "Thank you for your message. We'll get back soon." }))
      })
      .catch(err => {
          console.log(err, 'error')
      });
}