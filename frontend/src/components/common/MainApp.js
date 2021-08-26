import React, { Component, Fragment, useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { render } from "react-dom";
import Home from "../pages/Home";
import Playground from "../pages/Playground";
import Alerts from "../layout/Alerts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import LoaderApp from "./LoaderApp";
import Docs from "../pages/Docs";


const MainApp = () => {

    // console.log(useSelector(state => state))

    const isLoading = useSelector(state => state.auth.isLoading)
    // console.log(isLoading)


    return (
        <>
            <Fragment>
                { isLoading ? 
                    <div className='loader'>
                        <LoaderApp/>
                    </div>
                    
                    :
                    <Router>
                        <Fragment>
                            <Alerts/>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                                <Route exact path='/docs' component={Docs} />
                                <Route exact path='/register' component={Register} />
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/tool' component={Playground} />
                            </Switch>
                        </Fragment>
                    </Router>
                }
            </Fragment>
            
        </>
        
    )
}



export default MainApp
