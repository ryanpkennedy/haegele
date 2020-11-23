import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Canvas from './components/Canvas';
import Landing from './components/Landing';
import Lobby from './components/Lobby';
import Navbar from './components/Navbar';
import setAuthToken from './utils/setAuthToken';
import store from './store';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    return (
        <Provider store={store}>
            <Canvas></Canvas> 
            <Fragment>
                <Router>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Switch>
                            <Route exact path='/lobby' component={Lobby} />
                        </Switch>
                    </section>
                </Router>
            </Fragment>
        </Provider>
    );
}

export default App;
