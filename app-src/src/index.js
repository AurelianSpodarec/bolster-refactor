import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from 'helpers/serviceWorker';
import reducer from 'reducers';
import AppContainer from 'components/app/app/containers/AppContainer';
import '_content/scss/font-awesome.css';
import '_content/scss/main.scss';

let middleWare = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleWare = [...middleWare, logger];
}

const store = createStore(reducer, applyMiddleware(...middleWare));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
