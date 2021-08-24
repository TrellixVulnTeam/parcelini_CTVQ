import React, { useEffect } from "react";
import { render } from "react-dom";
import MainApp from "./common/MainApp";


// import PointCloudPanel from "./panels/PointCloudPanel";
import Navbar from "./layout/Navbar";
// import Feature from "./layout/Feature";
// import Models from "./layout/Models";

import { Provider } from 'react-redux';
import { Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import store from "../store";
import { loadUser } from "../actions/auth";


const alertOptions = {
    timeout: 6000,
    position: 'top center'
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    })

    

    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <MainApp/>
            </AlertProvider>
        </Provider>
        
    )
}
export default App;
const container = document.getElementById("app");
render(<App />, container);